import { useId } from "react"
import type { TaskCategory } from "@core/domain/task"
import { TaskCategoryOptions } from "@presentation/board/components/task-form/task-category-options"
import { FormField } from "@presentation/components/form-field"
import { Label } from "@ui/label"
import { Select, SelectTrigger, SelectValue } from "@ui/select"

type TaskCategoryFieldProps = {
  value: TaskCategory
  pending: boolean
  onChange: (value: string) => void
}

export function TaskCategoryField({ value, pending, onChange }: TaskCategoryFieldProps) {
  const id = useId()

  return (
    <FormField>
      <Label htmlFor={id}>분야</Label>
      <Select value={value} onValueChange={onChange} disabled={pending}>
        <SelectTrigger id={id} className="h-11 w-full">
          <SelectValue />
        </SelectTrigger>
        <TaskCategoryOptions />
      </Select>
    </FormField>
  )
}
