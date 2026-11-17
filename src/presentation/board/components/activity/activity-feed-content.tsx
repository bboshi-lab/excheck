import type { Activity } from "../../../../../core/domain/board"
import { CardContent } from "../../../ui/card"
import { ActivityList } from "./activity-list"
import { ActivityRetentionNote } from "./activity-retention-note"

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
