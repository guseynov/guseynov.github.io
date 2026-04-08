const UPSTREAM_URL = "https://this-person-does-not-exist.com/new";
const UPSTREAM_SITE = "https://this-person-does-not-exist.com";

function buildCorsHeaders(origin, allowedOrigin) {
  const responseOrigin =
    allowedOrigin && allowedOrigin !== "*" ? allowedOrigin : origin || "*";

  return {
    "Access-Control-Allow-Origin": responseOrigin,
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
}

function json(data, init = {}, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders,
      ...(init.headers || {})
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowedOrigin = env.ALLOWED_ORIGIN || "*";
    const corsHeaders = buildCorsHeaders(origin, allowedOrigin);
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    if (request.method !== "GET" || url.pathname !== "/api/faces/random") {
      return json(
        {
          error: "Not found"
        },
        { status: 404 },
        corsHeaders
      );
    }

    try {
      const upstream = await fetch(`${UPSTREAM_URL}?time=${Date.now()}`, {
        headers: {
          Accept: "application/json"
        },
        cf: {
          cacheTtl: 0,
          cacheEverything: false
        }
      });

      if (!upstream.ok) {
        return json(
          {
            error: "Upstream request failed",
            status: upstream.status
          },
          { status: 502 },
          corsHeaders
        );
      }

      const payload = await upstream.json();
      const src = payload?.src;

      if (!src) {
        return json(
          {
            error: "Upstream returned no image"
          },
          { status: 502 },
          corsHeaders
        );
      }

      const absoluteUrl = new URL(src, UPSTREAM_SITE).toString();

      return json(
        {
          id: payload.name || absoluteUrl,
          url: absoluteUrl,
          source: "this-person-does-not-exist"
        },
        { status: 200 },
        corsHeaders
      );
    } catch (error) {
      return json(
        {
          error: "Proxy request failed",
          message: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 502 },
        corsHeaders
      );
    }
  }
};
