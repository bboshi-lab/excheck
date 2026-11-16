import { Hono, type Handler } from "hono";
import {
  TaskInput,
  TaskPatch,
  seed,
  record,
  type Board,
} from "../src/domain/release";
type Bindings = { BOARD: DurableObjectNamespace };
// One Durable Object is one serialized workspace; no mutable isolate-global state.
export class ReleaseBoard {
  constructor(private state: DurableObjectState) {}
  async fetch(request: Request) {
    return this.state.blockConcurrencyWhile(async () => {
      const board = (await this.state.storage.get<Board>("board")) ?? seed();
      const url = new URL(request.url);
      if (request.method === "GET") return Response.json(board);
      const body = await request.json().catch(() => null);
      if (request.method === "POST") {
        const input = TaskInput.safeParse(body);
        if (!input.success)
          return Response.json(
            { error: "Use a title of 3–100 characters and a valid category." },
            { status: 400 },
          );
        const task = { ...input.data, id: crypto.randomUUID(), done: false };
        board.tasks.push(task);
        record(board, `Added “${task.title}”`);
        await this.state.storage.put("board", board);
        return Response.json(task, { status: 201 });
      }
      const input = TaskPatch.safeParse(body);
      if (!input.success)
        return Response.json(
          { error: "A boolean done value is required." },
          { status: 400 },
        );
      const task = board.tasks.find(
        (t) => t.id === decodeURIComponent(url.pathname.split("/").pop()!),
      );
      if (!task)
        return Response.json({ error: "Task not found." }, { status: 404 });
      task.done = input.data.done;
      record(board, `${task.done ? "Completed" : "Reopened"} “${task.title}”`);
      await this.state.storage.put("board", board);
      return Response.json(task);
    });
  }
}
const app = new Hono<{ Bindings: Bindings }>();
app.get("/api/health", (c) => c.json({ status: "ok" }));
const forward: Handler<{ Bindings: Bindings }> = (c) =>
  c.env.BOARD.get(c.env.BOARD.idFromName("demo")).fetch(c.req.raw);
app.get("/api/board", forward);
app.post("/api/tasks", forward);
app.patch("/api/tasks/:id", forward);
app.notFound((c) => c.json({ error: "Not found." }, 404));
export default app;
