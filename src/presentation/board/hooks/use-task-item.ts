import type { Task } from "../../../../core/domain/task"

import { useTaskTransition } from "../../hooks/use-task-transition"

import { useSetTaskDone } from "../api/board-hooks"

export function useTaskItem(task: Task) {
  const mutation = useSetTaskDone()
  const row = useTaskTransition(task.done)

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    if (mutation.isPending || checked === "indeterminate") return

    mutation.mutate({ id: task.id, done: checked })
  }

  return { row, pending: mutation.isPending, error: mutation.error?.message ?? null, handleCheckedChange }
}
