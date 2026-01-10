## VS SPEED Gemini Proxy (Cloudflare Worker)

This worker exists so the website can use Gemini **without exposing the Gemini API key** in the browser.

### What it does
- Accepts a request from the frontend containing the same JSON body you would send to Gemini `:generateContent`
- Adds the `x-goog-api-key` header server-side (secret)
- Forwards the request to the Gemini API and returns the response
- Adds CORS headers so `https://exotiekoh.github.io` can call it

### Required secrets / env
- `GEMINI_API_KEY` (secret)
- `ALLOWED_ORIGINS` (optional, comma-separated)

### Deploy (local)
1. Install wrangler:
   - `npm i -g wrangler`
2. Authenticate:
   - `wrangler login`
3. From this directory:
   - `wrangler deploy`
4. Set secrets:
   - `wrangler secret put GEMINI_API_KEY`

### Configure the website
Set `VITE_GEMINI_PROXY_URL` to your worker URL (e.g. `https://vsspeed-gemini-proxy.<account>.workers.dev`), then rebuild/redeploy the site.

