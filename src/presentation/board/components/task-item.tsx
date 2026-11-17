import { LoaderCircle } from "lucide-react"
import type { Task } from "../../../../core/domain/task"
import { Badge } from "../../ui/badge"
import { Checkbox } from "../../ui/checkbox"
import { useTaskTransition } from "../../hooks/use-task-transition"
import { useSetTaskDone } from "../api/board-hooks"
import { categoryBadgeClasses, categoryLabels } from "../labels"

type TaskItemProps = {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const mutation = useSetTaskDone()
  const row = useTaskTransition(task.done)

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    if (mutation.isPending || checked === "indeterminate") return

    mutation.mutate({ id: task.id, done: checked })
  }

  return (
    <li
      ref={row}
      className="border-b border-white/5 px-4 py-4 transition-colors last:border-0 hover:bg-white/2 sm:px-6"
      aria-busy={mutation.isPending}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.done}
          onCheckedChange={handleCheckedChange}
          disabled={mutation.isPending}
          aria-label={`${task.title} 완료 여부`}
          className="relative size-5 shrink-0 after:absolute after:-inset-3 rounded-md border-slate-500 data-[state=checked]:border-primary/30 data-[state=checked]:bg-primary/15 data-[state=checked]:text-violet-200"
        />
        <span
          className={`min-w-0 flex-1 wrap-anywhere text-xs leading-6 ${task.done ? "text-slate-400 line-through decoration-slate-600" : "text-slate-200"}`}
        >
          {task.title}
        </span>
        {mutation.isPending && (
          <LoaderCircle className="size-3.5 shrink-0 animate-spin text-primary" aria-label="저장 중" />
        )}
        <Badge
          variant="outline"
          className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-normal ${categoryBadgeClasses[task.category]}`}
        >
          {categoryLabels[task.category]}
        </Badge>
      </div>
      {mutation.error && (
        <p role="alert" className="ml-7.5 mt-2 text-xs leading-6 text-destructive">
          {mutation.error.message}
        </p>
      )}
    </li>
  )
}
