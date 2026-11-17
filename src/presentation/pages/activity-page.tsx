import { useBoard } from "../board/api/board-hooks"
import { BoardQueryBoundary } from "../board/components/board-query-boundary"
import { ActivityFeed } from "../board/components/activity-feed"

export function ActivityPage() {
  const query = useBoard()

  return (
    <BoardQueryBoundary query={query}>
      {query.data && (
        <div className="max-w-3xl">
          <ActivityFeed activity={query.data.activity} />
        </div>
      )}
    </BoardQueryBoundary>
  )
}
