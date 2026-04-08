# hot_or_not

Swipe through AI-generated portraits and rate them hot or not.

## Frontend

Install and run locally:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

The app supports two feed modes:

- Live AI feed through `VITE_FACE_API_URL`
- Bundled fallback deck when the live API is unavailable

Example local env:

```bash
cp .env.example .env.local
```

## Cloudflare Worker Proxy

The upstream AI face source does not expose browser-friendly CORS headers, so a
small proxy is required for production live fetching.

Worker files live in `cloudflare/wrangler.toml` and `cloudflare/worker.mjs`.

Deploy steps:

```bash
npm install -g wrangler
cd cloudflare
wrangler login
wrangler deploy
```

After deploy, set the frontend API URL:

```bash
VITE_FACE_API_URL=https://YOUR-WORKER.workers.dev/api/faces/random
```

Optional hardening:

- Set `ALLOWED_ORIGIN` in `cloudflare/wrangler.toml` or via Wrangler secrets/vars to your real site origin instead of `*`
- Put the worker behind a custom domain if you want the API URL to look first-party
