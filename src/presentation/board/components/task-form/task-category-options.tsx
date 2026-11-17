import { TASK_CATEGORIES } from "@core/domain/task"
import { categoryLabels } from "@presentation/board/labels"
import { SelectContent, SelectItem } from "@ui/select"

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
