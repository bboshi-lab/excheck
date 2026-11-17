import { useBoard } from "@presentation/board/api/board-hooks"
import { ActivityFeed } from "@presentation/board/components/activity-feed"
import { BoardQueryBoundary } from "@presentation/board/components/board-query-boundary"
import { ActivityPageLayout } from "@presentation/pages/layouts/activity-page-layout"

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
