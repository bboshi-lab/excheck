import { TaskCancelButton } from "./task-cancel-button"
import { TaskSubmitButton } from "./task-submit-button"

type TaskFormActionsProps = {
  pending: boolean
  onCancel: () => void
}

export function TaskFormActions({ pending, onCancel }: TaskFormActionsProps) {
  return (
    <div className="flex justify-end gap-2 border-t border-white/8 pt-5">
      <TaskCancelButton pending={pending} onCancel={onCancel} />
      <TaskSubmitButton pending={pending} />
    </div>
  )
}
