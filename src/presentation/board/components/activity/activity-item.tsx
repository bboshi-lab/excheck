import type { Activity } from "@core/domain/board"
import { ActivityConnector } from "@presentation/board/components/activity/activity-connector"
import { ActivityDetails } from "@presentation/board/components/activity/activity-details"
import { ActivityItemLayout } from "@presentation/board/components/activity/activity-item-layout"
import { ActivityMarker } from "@presentation/board/components/activity/activity-marker"

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
