import type { CreateTaskInput } from "../../../../core/domain/task"
import { useTaskForm } from "../hooks/use-task-form"
import { TaskFormLayout } from "./task-form/task-form-layout"
import { TaskTitleField } from "./task-form/task-title-field"
import { TaskCategoryField } from "./task-form/task-category-field"
import { TaskFormError } from "./task-form/task-form-error"
import { TaskFormActions } from "./task-form/task-form-actions"

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
