import { Clock3 } from "lucide-react"

import { formatActivityTime } from "../../../lib/format-activity-time"

type ActivityTimeProps = {
  at: string
}

export function ActivityTime({ at }: ActivityTimeProps) {
  return (
    <time dateTime={at} className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
      <Clock3 className="size-2.5" />
      {formatActivityTime(at)}
    </time>
  )
}
