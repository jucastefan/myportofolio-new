export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    try {
      // Try to get the requested asset from KV
      const asset = await env.__STATIC_CONTENT.get(url.pathname);
      if (asset) {
        const contentType = getContentType(url.pathname);
        return new Response(asset, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    } catch (e) {
      console.error("KV error:", e);
    }

    // Fallback to serving index.html for SPA routing
    try {
      const indexAsset = await env.__STATIC_CONTENT.get("/index.html");
      if (indexAsset) {
        return new Response(indexAsset, {
          headers: {
            "Content-Type": "text/html",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    } catch (e) {
      console.error("Fallback error:", e);
    }

    return new Response("Not Found", { status: 404 });
  },
};

function getContentType(pathname: string): string {
  if (pathname.endsWith(".html")) return "text/html";
  if (pathname.endsWith(".js")) return "application/javascript";
  if (pathname.endsWith(".css")) return "text/css";
  if (pathname.endsWith(".json")) return "application/json";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg"))
    return "image/jpeg";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  if (pathname.endsWith(".woff2")) return "font/woff2";
  return "application/octet-stream";
}
