import { TaskCancelButton } from "@presentation/board/components/task-form/task-cancel-button"
import { TaskFormActionsLayout } from "@presentation/board/components/task-form/task-form-actions-layout"
import { TaskSubmitButton } from "@presentation/board/components/task-form/task-submit-button"

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
