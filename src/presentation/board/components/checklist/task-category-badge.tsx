import type { TaskCategory } from "../../../../../core/domain/task"

import { Badge } from "../../../ui/badge"

import { categoryLabels, categoryBadgeClasses } from "../../labels"

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
