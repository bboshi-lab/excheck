import type { Activity } from "../../../../../core/domain/board"

import { ActivityFeed } from "../activity-feed"
import { ActivityHistoryLink } from "../activity/activity-history-link"
import { DashboardActivityLayout } from "./dashboard-activity-layout"

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
