import { TASK_CATEGORIES } from "@core/domain/task"
import { categoryLabels } from "@presentation/board/labels"
import { isTaskFilter, type TaskFilter } from "@presentation/board/state/filter-store"
import { Tabs, TabsList, TabsTrigger } from "@ui/tabs"

type TaskFiltersProps = {
  value: TaskFilter
  panelId: string
  onChange: (value: TaskFilter) => void
}

export function TaskFilters({ value, panelId, onChange }: TaskFiltersProps) {
  const handleValueChange = (nextValue: string) => {
    if (isTaskFilter(nextValue)) onChange(nextValue)
  }

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList aria-label="작업 분야 필터" className="h-9 w-full border border-white/5 bg-background/60 sm:w-auto">
        <TabsTrigger value="all" id={`${panelId}-all`} aria-controls={panelId} className="px-4 text-xs">
          전체
        </TabsTrigger>
        {TASK_CATEGORIES.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            id={`${panelId}-${category}`}
            aria-controls={panelId}
            className="px-4 text-xs"
          >
            {categoryLabels[category]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
