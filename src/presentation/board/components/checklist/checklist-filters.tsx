import type { TaskFilter } from "../../state/filter-store"
import { CardContent } from "../../../ui/card"
import { TaskFilters } from "../task-filters"

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
