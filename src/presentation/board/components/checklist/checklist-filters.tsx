import { TaskFilters } from "@presentation/board/components/task-filters"
import type { TaskFilter } from "@presentation/board/state/filter-store"
import { CardContent } from "@ui/card"

type ChecklistFiltersProps = {
  category: TaskFilter
  panelId: string
  onChange: (value: TaskFilter) => void
}

export function ChecklistFilters({ category, panelId, onChange }: ChecklistFiltersProps) {
  return (
    <CardContent className="px-4 pb-4 sm:px-6">
      <TaskFilters value={category} panelId={panelId} onChange={onChange} />
    </CardContent>
  )
}
