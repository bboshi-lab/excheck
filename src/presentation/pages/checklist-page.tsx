import { useBoard } from "@presentation/board/api/board-hooks"
import { BoardQueryBoundary } from "@presentation/board/components/board-query-boundary"
import { CategoryProgressChart } from "@presentation/board/components/category-progress-chart"
import { TaskChecklist } from "@presentation/board/components/task-checklist"
import { useSectionEntrance } from "@presentation/hooks/use-section-entrance"
import { ChecklistPageLayout } from "@presentation/pages/layouts/checklist-page-layout"

export function ChecklistPage() {
  const query = useBoard()
  const scope = useSectionEntrance(query.isSuccess)

  return (
    <BoardQueryBoundary query={query}>
      {query.data && (
        <ChecklistPageLayout ref={scope}>
          <TaskChecklist board={query.data} />
          <CategoryProgressChart tasks={query.data.tasks} />
        </ChecklistPageLayout>
      )}
    </BoardQueryBoundary>
  )
}
