import type { Activity } from "../../../../../core/domain/board"
import { ActivityConnector } from "./activity-connector"
import { ActivityMarker } from "./activity-marker"
import { ActivityDetails } from "./activity-details"

type ActivityItemProps = {
  event: Activity
  latest: boolean
  last: boolean
}

export function ActivityItem({ event, latest, last }: ActivityItemProps) {
  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      {!last && <ActivityConnector />}
      <ActivityMarker latest={latest} />
      <ActivityDetails event={event} />
    </li>
  )
}
