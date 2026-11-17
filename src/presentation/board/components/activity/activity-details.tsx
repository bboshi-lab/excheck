import type { Activity } from "../../../../../core/domain/board"
import { ActivityMessage } from "./activity-message"
import { ActivityTime } from "./activity-time"

type ActivityDetailsProps = {
  event: Activity
}

export function ActivityDetails({ event }: ActivityDetailsProps) {
  return (
    <div className="min-w-0 pt-0.5">
      <ActivityMessage message={event.message} />
      <ActivityTime at={event.at} />
    </div>
  )
}
