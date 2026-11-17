import { Hono } from "hono";
import type { BoardGateway } from "../../core/application/ports/board-gateway";
import { TaskNotFoundError } from "../../core/application/task-not-found-error";
import {
  createTaskSchema,
  setTaskDoneSchema,
} from "../../core/contracts/task-contract";

export function createBoardApi(board: BoardGateway, basePath = "/api") {
  const app = new Hono().basePath(basePath);

  app.get("/health", (context) => context.json({ status: "ok" }));
  app.get("/board", async (context) => context.json(await board.getBoard()));

  app.post("/tasks", async (context) => {
    const body: unknown = await context.req.json().catch(() => null);
    const input = createTaskSchema.safeParse(body);

    if (!input.success) {
      return context.json(
        { error: "Use a title of 3–100 characters and a valid category." },
        400,
      );
    }

    return context.json(await board.createTask(input.data), 201);
  });

  app.patch("/tasks/:id", async (context) => {
    const body: unknown = await context.req.json().catch(() => null);
    const input = setTaskDoneSchema.safeParse(body);

    if (!input.success) {
      return context.json({ error: "A boolean done value is required." }, 400);
    }

    return context.json(
      await board.setTaskDone(context.req.param("id"), input.data.done),
    );
  });

  app.notFound((context) => context.json({ error: "Not found." }, 404));
  app.onError((error, context) => {
    if (error instanceof TaskNotFoundError) {
      return context.json({ error: error.message }, 404);
    }

    return context.json({ error: "Unable to update the workspace." }, 500);
  });

  return app;
}
