import { http, HttpResponse, delay } from "msw";
import {
  seed,
  record,
  TaskInput,
  TaskPatch,
  type Board,
} from "../domain/release";
// Each browser session owns its demo data. No production persistence is implied.
let board: Board = seed();
export const resetMockBoard = () => {
  board = seed();
};
export const handlers = [
  http.get("*/api/board", async () => {
    await delay(100);
    return HttpResponse.json(board);
  }),
  http.post("*/api/tasks", async ({ request }) => {
    const input = TaskInput.safeParse(await request.json().catch(() => null));
    if (!input.success)
      return HttpResponse.json(
        { error: "Use a title of 3–100 characters and a valid category." },
        { status: 400 },
      );
    const task = { ...input.data, id: crypto.randomUUID(), done: false };
    board.tasks.push(task);
    record(board, `Added “${task.title}”`);
    return HttpResponse.json(task, { status: 201 });
  }),
  http.patch("*/api/tasks/:id", async ({ params, request }) => {
    const input = TaskPatch.safeParse(await request.json().catch(() => null));
    if (!input.success)
      return HttpResponse.json(
        { error: "A boolean done value is required." },
        { status: 400 },
      );
    const task = board.tasks.find((t) => t.id === params.id);
    if (!task)
      return HttpResponse.json({ error: "Task not found." }, { status: 404 });
    task.done = input.data.done;
    record(board, `${task.done ? "Completed" : "Reopened"} “${task.title}”`);
    return HttpResponse.json(task);
  }),
];
