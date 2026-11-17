import type { Task } from "../../../../../core/domain/task"

import { Checkbox } from "../../../ui/checkbox"

type TaskToggleProps = {
  task: Task
  pending: boolean
  onChange: (checked: boolean | "indeterminate") => void
}

export function TaskToggle({ task, pending, onChange }: TaskToggleProps) {
  return (
    <Checkbox
      checked={task.done}
      onCheckedChange={onChange}
      disabled={pending}
      aria-label={`${task.title} 완료 여부`}
      className="relative size-5 shrink-0 after:absolute after:-inset-3 rounded-md border-slate-500 data-[state=checked]:border-primary/30 data-[state=checked]:bg-primary/15 data-[state=checked]:text-violet-200"
    />
  )
}
