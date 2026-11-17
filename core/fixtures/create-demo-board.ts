import type { Board } from "../domain/board";

export function createDemoBoard(): Board {
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
