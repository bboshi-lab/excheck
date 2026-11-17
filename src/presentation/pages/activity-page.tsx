import { useBoard } from "../board/api/board-hooks"
import { BoardQueryBoundary } from "../board/components/board-query-boundary"
import { ActivityFeed } from "../board/components/activity-feed"
import { ActivityPageLayout } from "./layouts/activity-page-layout"

export function ActivityPage() {
  const query = useBoard()

  return (
    <BoardQueryBoundary query={query}>
      {query.data && (
        <ActivityPageLayout>
          <ActivityFeed activity={query.data.activity} />
        </ActivityPageLayout>
      )}
    </BoardQueryBoundary>
  )
}
