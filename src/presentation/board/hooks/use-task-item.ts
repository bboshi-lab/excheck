import type { Task } from "@core/domain/task"
import { useSetTaskDone } from "@presentation/board/api/board-hooks"
import { useTaskTransition } from "@presentation/hooks/use-task-transition"

export function useTaskItem(task: Task) {
  const mutation = useSetTaskDone()
  const row = useTaskTransition(task.done)

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    if (mutation.isPending || checked === "indeterminate") return

    mutation.mutate({ id: task.id, done: checked })
  }

  return { row, pending: mutation.isPending, error: mutation.error?.message ?? null, handleCheckedChange }
}
