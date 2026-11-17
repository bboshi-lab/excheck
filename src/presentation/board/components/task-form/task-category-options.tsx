import { TASK_CATEGORIES } from "../../../../../core/domain/task"

import { SelectContent, SelectItem } from "../../../ui/select"

import { categoryLabels } from "../../labels"

export function TaskCategoryOptions() {
  return (
    <SelectContent>
      {TASK_CATEGORIES.map((category) => (
        <SelectItem key={category} value={category}>
          {categoryLabels[category]}
        </SelectItem>
      ))}
    </SelectContent>
  )
}
