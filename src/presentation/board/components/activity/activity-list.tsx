import type { Activity } from "../../../../../core/domain/board"
import { ActivityItem } from "./activity-item"
import { ActivityEmptyState } from "./activity-empty-state"

type ActivityListProps = {
  activity: Activity[]
}

export function ActivityList({ activity }: ActivityListProps) {
  if (!activity.length) return <ActivityEmptyState />

  return (
    <ol aria-label="최근 활동" className="grid">
      {activity.map((event, index) => (
        <ActivityItem key={event.id} event={event} latest={index === 0} last={index === activity.length - 1} />
      ))}
    </ol>
  )
}
