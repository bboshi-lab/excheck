import { Badge } from "../../../ui/badge"

import { PanelHeading } from "../../../components/panel-heading"

type ActivityFeedHeaderProps = {
  count: number
}

export function ActivityFeedHeader({ count }: ActivityFeedHeaderProps) {
  return (
    <PanelHeading
      eyebrow="작은 변화의 기록"
      title="활동 타임라인"
      action={
        <Badge variant="secondary" className="text-[10px] font-normal">
          {count}건
        </Badge>
      }
    />
  )
}
