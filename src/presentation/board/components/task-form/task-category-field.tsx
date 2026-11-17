import { useId } from "react"

import type { TaskCategory } from "../../../../../core/domain/task"

import { Label } from "../../../ui/label"
import { Select, SelectTrigger, SelectValue } from "../../../ui/select"

import { FormField } from "../../../components/form-field"

import { TaskCategoryOptions } from "./task-category-options"

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
