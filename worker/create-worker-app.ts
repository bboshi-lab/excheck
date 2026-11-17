import { Hono } from "hono";

export type BoardForwarder = (request: Request) => Response | Promise<Response>;

export function createWorkerApp(forward: BoardForwarder) {
  const app = new Hono();

  app.get("/api/health", (context) => context.json({ status: "ok" }));
  app.all("/api/*", (context) => forward(context.req.raw));
  app.notFound((context) => context.json({ error: "Not found." }, 404));

  return app;
}
