import { useBoard } from "@presentation/board/api/board-hooks"
import { BoardQueryBoundary } from "@presentation/board/components/board-query-boundary"
import { DashboardView } from "@presentation/board/components/dashboard-view"

export function DashboardPage() {
  const query = useBoard()

  return <BoardQueryBoundary query={query}>{query.data && <DashboardView board={query.data} />}</BoardQueryBoundary>
}
