## VS SPEED AI Setup (Gemini 3 Flash)

### Why it was “not working” on GitHub Pages
GitHub Pages is static hosting. Vite env vars like `VITE_GEMINI_API_KEY` are **baked at build time** and would be **public** in the JS bundle.

To make AI work safely in production, the website must call a **server-side proxy** that holds the Gemini key.

---

### Recommended architecture (production-safe)
- **Frontend (GitHub Pages)** calls: `POST <proxy>/generateContent?model=gemini-3-flash-preview`
- **Proxy (Cloudflare Worker)** forwards to Gemini API with `x-goog-api-key` server-side

The proxy code is included at:
- `workers/gemini-proxy`

---

### Step 1 — Deploy the proxy (Cloudflare Worker)
1. Install Wrangler:
   - `npm i -g wrangler`
2. Login:
   - `wrangler login`
3. Deploy from the worker folder:
   - `cd workers/gemini-proxy`
   - `npm i`
   - `wrangler deploy`
4. Set your Gemini key as a secret:
   - `wrangler secret put GEMINI_API_KEY`

Optional: tighten CORS by editing `ALLOWED_ORIGINS` in `workers/gemini-proxy/wrangler.toml`.

---

### Step 2 — Point the website at the proxy
Set this Vite env var **before building** the website:
- `VITE_GEMINI_PROXY_URL=https://<your-worker>.workers.dev`

Then rebuild/redeploy the site.

#### If you use GitHub Pages deployment via Actions
This repo includes a workflow: `.github/workflows/deploy-pages.yml`

Set the Actions variable in GitHub:
- **Settings → Secrets and variables → Actions → Variables**
- Add: `VITE_GEMINI_PROXY_URL = https://<your-worker>.workers.dev`

---

### Dev-only fallback (not recommended for production)
You *can* run locally with:
- `VITE_GEMINI_API_KEY=...`

But **do not** ship that to GitHub Pages (it will be exposed).

