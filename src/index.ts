/**
 * Welcome to Cloudflare Workers! This is your first worker.
 */

export default {
  async fetch(request: Request): Promise<Response> {
    return fetch(request);
  },
} satisfies ExportedHandler<Env>;

interface Env {}

export interface ExportedHandler<Env = unknown> {
  fetch: ExportedHandlerFetchHandler<Env>;
}

export type ExportedHandlerFetchHandler<Env = unknown> = (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) => Response | Promise<Response>;

interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}
