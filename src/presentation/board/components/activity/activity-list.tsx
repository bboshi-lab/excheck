import type { Activity } from "../../../../../core/domain/board"

import { ActivityEmptyState } from "./activity-empty-state"
import { ActivityItem } from "./activity-item"
import { ActivityListLayout } from "./activity-list-layout"

type ActivityListProps = {
  activity: Activity[]
}

export function ActivityList({ activity }: ActivityListProps) {
  if (!activity.length) return <ActivityEmptyState />

  return (
    <ActivityListLayout>
      {activity.map((event, index) => (
        <ActivityItem key={event.id} event={event} latest={index === 0} last={index === activity.length - 1} />
      ))}
    </ActivityListLayout>
  )
}
