import type { TaskCategory } from "@core/domain/task"
import { categoryLabels, categoryBadgeClasses } from "@presentation/board/labels"
import { Badge } from "@ui/badge"

type TaskCategoryBadgeProps = {
  category: TaskCategory
}

export function TaskCategoryBadge({ category }: TaskCategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-normal ${categoryBadgeClasses[category]}`}
    >
      {categoryLabels[category]}
    </Badge>
  )
}
