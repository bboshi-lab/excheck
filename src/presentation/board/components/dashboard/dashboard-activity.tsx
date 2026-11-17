import type { Activity } from "../../../../../core/domain/board"
import { ActivityFeed } from "../activity-feed"
import { ActivityHistoryLink } from "../activity/activity-history-link"

type DashboardActivityProps = {
  activity: Activity[]
}

export function DashboardActivity({ activity }: DashboardActivityProps) {
  return (
    <div className="grid gap-2">
      <ActivityFeed activity={activity} compact />
      <ActivityHistoryLink />
    </div>
  )
}
