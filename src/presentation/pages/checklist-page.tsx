import { useSectionEntrance } from "../hooks/use-section-entrance"

import { useBoard } from "../board/api/board-hooks"
import { BoardQueryBoundary } from "../board/components/board-query-boundary"
import { CategoryProgressChart } from "../board/components/category-progress-chart"
import { TaskChecklist } from "../board/components/task-checklist"
import { ChecklistPageLayout } from "./layouts/checklist-page-layout"

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
