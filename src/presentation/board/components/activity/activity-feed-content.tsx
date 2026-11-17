import type { Activity } from "@core/domain/board"
import { ActivityList } from "@presentation/board/components/activity/activity-list"
import { ActivityRetentionNote } from "@presentation/board/components/activity/activity-retention-note"
import { CardContent } from "@ui/card"

type ActivityFeedContentProps = {
  activity: Activity[]
  compact: boolean
}

export function ActivityFeedContent({ activity, compact }: ActivityFeedContentProps) {
  const displayed = compact ? activity.slice(0, 4) : activity

  return (
    <CardContent>
      <ActivityList activity={displayed} />
      <ActivityRetentionNote count={activity.length} compact={compact} />
    </CardContent>
  )
}
