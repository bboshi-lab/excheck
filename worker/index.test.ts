import { describe, it, expect } from "vitest";
import app, { ReleaseBoard } from "./index";
// Storage double exercises the actual Worker handler without a Cloudflare account.
function bindings() {
  const data = new Map<string, unknown>();
  const state = {
    blockConcurrencyWhile: async (fn: () => unknown) => fn(),
    storage: {
      get: async (key: string) => data.get(key),
      put: async (key: string, value: unknown) => {
        data.set(key, structuredClone(value));
      },
    },
  };
  const object = new ReleaseBoard(state as unknown as DurableObjectState);
  return {
    BOARD: {
      idFromName: () => "demo",
      get: () => ({ fetch: (r: Request) => object.fetch(r) }),
    } as unknown as { BOARD: DurableObjectNamespace },
  };
}
describe("Hono Worker API", () => {
  it("has a health endpoint and JSON 404", async () => {
    expect(await (await app.request("/api/health")).json()).toEqual({
      status: "ok",
    });
    expect((await app.request("/unknown")).status).toBe(404);
  });
  it("validates, creates, persists, completes and reopens a check", async () => {
    const env = bindings();
    const post = (body: unknown) =>
      app.request(
        "/api/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
        env,
      );
    expect((await post({ title: " ", category: "Design" })).status).toBe(400);
    const result = await post({
      title: "  Release notes  ",
      category: "Operations",
    });
    expect(result.status).toBe(201);
    const task = (await result.json()) as { id: string; title: string };
    expect(task.title).toBe("Release notes");
    for (const done of [true, false]) {
      const res = await app.request(
        `/api/tasks/${task.id}`,
        { method: "PATCH", body: JSON.stringify({ done }) },
        env,
      );
      expect(await res.json()).toMatchObject({ done });
    }
    const board = (await (await app.request("/api/board", {}, env)).json()) as {
      tasks: unknown[];
      activity: unknown[];
    };
    expect(board.tasks).toHaveLength(7);
    expect(board.activity).toHaveLength(4);
    expect(
      (
        await app.request(
          "/api/tasks/nope",
          { method: "PATCH", body: '{"done":true}' },
          env,
        )
      ).status,
    ).toBe(404);
    expect(
      (
        await app.request(
          "/api/tasks/nope",
          { method: "PATCH", body: "bad json" },
          env,
        )
      ).status,
    ).toBe(400);
  });
});
