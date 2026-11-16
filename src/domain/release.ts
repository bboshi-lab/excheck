import { z } from "zod";
export const TaskInput = z.object({
  title: z.string().trim().min(3).max(100),
  category: z.enum(["Engineering", "Design", "Operations"]),
});
export const TaskPatch = z.object({ done: z.boolean() });
export type Task = z.infer<typeof TaskInput> & { id: string; done: boolean };
export type Activity = { id: string; message: string; at: string };
export type Board = { tasks: Task[]; activity: Activity[] };
export function readiness(tasks: Task[]) {
  const complete = tasks.filter((t) => t.done).length;
  return {
    complete,
    total: tasks.length,
    percent: tasks.length ? Math.round((complete / tasks.length) * 100) : 0,
  };
}
export function seed(): Board {
  return {
    tasks: [
      {
        id: "1",
        title: "Authentication & permission audit",
        category: "Engineering",
        done: true,
      },
      {
        id: "2",
        title: "Responsive layout review",
        category: "Design",
        done: true,
      },
      {
        id: "3",
        title: "Error monitoring and alerts",
        category: "Operations",
        done: false,
      },
      {
        id: "4",
        title: "Keyboard & screen reader pass",
        category: "Design",
        done: false,
      },
      {
        id: "5",
        title: "API contract verification",
        category: "Engineering",
        done: true,
      },
      {
        id: "6",
        title: "Rollback runbook",
        category: "Operations",
        done: false,
      },
    ],
    activity: [
      {
        id: "seed",
        message: "Workspace created. A good launch starts here.",
        at: "2026-11-16T09:00:00Z",
      },
    ],
  };
}
export function record(board: Board, message: string) {
  board.activity.unshift({
    id: crypto.randomUUID(),
    message,
    at: new Date().toISOString(),
  });
  board.activity = board.activity.slice(0, 20);
}
