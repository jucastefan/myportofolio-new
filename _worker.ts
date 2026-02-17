import { getAssetFromKV, MethodNotAllowedError, NotFoundError } from '@cloudflare/workers-kv-asset-handler';

interface Env {
  __STATIC_CONTENT: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // Try to get the requested asset
      return await getAssetFromKV(
        {
          request,
          waitUntil: (promise: Promise<void>) => promise,
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
        }
      );
    } catch (e) {
      // Handle routing - serve index.html for SPA routes
      if (e instanceof NotFoundError || e instanceof MethodNotAllowedError) {
        try {
          return await getAssetFromKV(
            {
              request: new Request(`${new URL(request.url).origin}/index.html`, request),
              waitUntil: (promise: Promise<void>) => promise,
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
            }
          );
        } catch (fallbackError) {
          return new Response('Not Found', { status: 404 });
        }
      }
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
