import type { Activity } from "../../../../../core/domain/board"

import { ActivityConnector } from "./activity-connector"
import { ActivityDetails } from "./activity-details"
import { ActivityItemLayout } from "./activity-item-layout"
import { ActivityMarker } from "./activity-marker"

type ActivityItemProps = {
  event: Activity
  latest: boolean
  last: boolean
}

export function ActivityItem({ event, latest, last }: ActivityItemProps) {
  return (
    <ActivityItemLayout>
      {!last && <ActivityConnector />}
      <ActivityMarker latest={latest} />
      <ActivityDetails event={event} />
    </ActivityItemLayout>
  )
}
