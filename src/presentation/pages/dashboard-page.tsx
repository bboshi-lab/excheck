import { useBoard } from "../board/api/board-hooks"
import { BoardQueryBoundary } from "../board/components/board-query-boundary"
import { DashboardView } from "../board/components/dashboard-view"

export function DashboardPage() {
  const query = useBoard()

  return <BoardQueryBoundary query={query}>{query.data && <DashboardView board={query.data} />}</BoardQueryBoundary>
}
