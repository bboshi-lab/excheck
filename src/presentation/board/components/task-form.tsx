import type { CreateTaskInput } from "@core/domain/task"
import { TaskCategoryField } from "@presentation/board/components/task-form/task-category-field"
import { TaskFormActions } from "@presentation/board/components/task-form/task-form-actions"
import { TaskFormError } from "@presentation/board/components/task-form/task-form-error"
import { TaskFormLayout } from "@presentation/board/components/task-form/task-form-layout"
import { TaskTitleField } from "@presentation/board/components/task-form/task-title-field"
import { useTaskForm } from "@presentation/board/hooks/use-task-form"

type TaskFormProps = {
  pending: boolean
  error: string | null
  onSubmit: (input: CreateTaskInput) => void
  onCancel: () => void
}

export function TaskForm({ pending, error, onSubmit, onCancel }: TaskFormProps) {
  const form = useTaskForm({ pending, onSubmit })

  return (
    <TaskFormLayout onSubmit={form.handleSubmit}>
      <TaskTitleField
        inputRef={form.titleInput}
        value={form.title}
        pending={pending}
        error={form.validationError}
        onChange={form.setTitle}
      />
      <TaskCategoryField value={form.category} pending={pending} onChange={form.handleCategoryChange} />
      <TaskFormError error={error} />
      <TaskFormActions pending={pending} onCancel={onCancel} />
    </TaskFormLayout>
  )
}
