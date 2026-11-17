import type { Activity } from "@core/domain/board"
import { ActivityFeedContent } from "@presentation/board/components/activity/activity-feed-content"
import { ActivityFeedHeader } from "@presentation/board/components/activity/activity-feed-header"
import { Card } from "@ui/card"

type ActivityFeedProps = {
  activity: Activity[]
  compact?: boolean
}

export function ActivityFeed({ activity, compact = false }: ActivityFeedProps) {
  return (
    <Card className="gap-5 border-white/7 bg-card/85" data-entrance>
      <ActivityFeedHeader count={activity.length} />
      <ActivityFeedContent activity={activity} compact={compact} />
    </Card>
  )
}
