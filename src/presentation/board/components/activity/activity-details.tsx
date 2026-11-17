import type { Activity } from "../../../../../core/domain/board"

import { ActivityDetailsLayout } from "./activity-details-layout"
import { ActivityMessage } from "./activity-message"
import { ActivityTime } from "./activity-time"

type ActivityDetailsProps = {
  event: Activity
}

export function ActivityDetails({ event }: ActivityDetailsProps) {
  return (
    <ActivityDetailsLayout>
      <ActivityMessage message={event.message} />
      <ActivityTime at={event.at} />
    </ActivityDetailsLayout>
  )
}
