type Env = {
  GEMINI_API_KEY: string;
  ALLOWED_ORIGINS?: string;
};

function getAllowedOrigin(requestOrigin: string | null, env: Env): string | null {
  const allowList = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!requestOrigin) return allowList[0] || null;
  if (allowList.includes("*")) return requestOrigin;
  return allowList.includes(requestOrigin) ? requestOrigin : null;
}

function corsHeaders(origin: string | null) {
  const h = new Headers();
  if (origin) h.set("Access-Control-Allow-Origin", origin);
  h.set("Vary", "Origin");
  h.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  h.set("Access-Control-Allow-Headers", "Content-Type");
  h.set("Access-Control-Max-Age", "86400");
  return h;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowedOrigin = getAllowedOrigin(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders(allowedOrigin),
      });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "Proxy misconfigured (missing GEMINI_API_KEY)" }), {
        status: 500,
        headers: corsHeaders(allowedOrigin),
      });
    }

    if (!allowedOrigin) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: corsHeaders(null),
      });
    }

    // Endpoint: POST /generateContent?model=gemini-3-flash-preview
    const url = new URL(request.url);
    if (url.pathname !== "/generateContent") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: corsHeaders(allowedOrigin),
      });
    }

    const model = url.searchParams.get("model") || "gemini-3-flash-preview";
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent`;

    const bodyText = await request.text();
    const upstreamResp = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.GEMINI_API_KEY,
      },
      body: bodyText,
    });

    const respText = await upstreamResp.text();
    const headers = corsHeaders(allowedOrigin);
    headers.set("Content-Type", "application/json");
    return new Response(respText, { status: upstreamResp.status, headers });
  },
};

