import { TaskCancelButton } from "./task-cancel-button"
import { TaskFormActionsLayout } from "./task-form-actions-layout"
import { TaskSubmitButton } from "./task-submit-button"

type TaskFormActionsProps = {
  pending: boolean
  onCancel: () => void
}

export function TaskFormActions({ pending, onCancel }: TaskFormActionsProps) {
  return (
    <TaskFormActionsLayout>
      <TaskCancelButton pending={pending} onCancel={onCancel} />
      <TaskSubmitButton pending={pending} />
    </TaskFormActionsLayout>
  )
}
