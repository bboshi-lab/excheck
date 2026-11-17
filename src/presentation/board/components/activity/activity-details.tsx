import type { Activity } from "@core/domain/board"
import { ActivityDetailsLayout } from "@presentation/board/components/activity/activity-details-layout"
import { ActivityMessage } from "@presentation/board/components/activity/activity-message"
import { ActivityTime } from "@presentation/board/components/activity/activity-time"

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
