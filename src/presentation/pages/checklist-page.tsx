import { useBoard } from "../board/api/board-hooks"
import { BoardQueryBoundary } from "../board/components/board-query-boundary"
import { TaskChecklist } from "../board/components/task-checklist"
import { CategoryProgressChart } from "../board/components/category-progress-chart"
import { useSectionEntrance } from "../hooks/use-section-entrance"

export function ChecklistPage() {
  const query = useBoard()
  const scope = useSectionEntrance(query.isSuccess)

  return (
    <BoardQueryBoundary query={query}>
      {query.data && (
        <div ref={scope} className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <TaskChecklist board={query.data} />
          <CategoryProgressChart tasks={query.data.tasks} />
        </div>
      )}
    </BoardQueryBoundary>
  )
}
