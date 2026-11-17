import type { Activity } from "@core/domain/board"
import { ActivityFeed } from "@presentation/board/components/activity-feed"
import { ActivityHistoryLink } from "@presentation/board/components/activity/activity-history-link"
import { DashboardActivityLayout } from "@presentation/board/components/dashboard/dashboard-activity-layout"

type DashboardActivityProps = {
  activity: Activity[]
}

export function DashboardActivity({ activity }: DashboardActivityProps) {
  return (
    <DashboardActivityLayout>
      <ActivityFeed activity={activity} compact />
      <ActivityHistoryLink />
    </DashboardActivityLayout>
  )
}
