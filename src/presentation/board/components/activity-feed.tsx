import { Activity, ArrowDownRight, Clock3 } from "lucide-react"
import type { Activity as BoardActivity } from "../../../../core/domain/board"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { formatActivityTime } from "../../lib/format-activity-time"

type ActivityFeedProps = {
  activity: BoardActivity[]
  compact?: boolean
}

export function ActivityFeed({ activity, compact = false }: ActivityFeedProps) {
  const displayed = compact ? activity.slice(0, 4) : activity

  return (
    <Card className="gap-5 border-white/7 bg-card/85" data-entrance>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardDescription className="mb-2 text-[10px] tracking-widest">작은 변화의 기록</CardDescription>
          <CardTitle role="heading" aria-level={2} className="text-base">
            활동 타임라인
          </CardTitle>
        </div>
        <Badge variant="secondary" className="text-[10px] font-normal">
          {activity.length}건
        </Badge>
      </CardHeader>
      <CardContent>
        {displayed.length ? (
          <ol aria-label="최근 활동" className="grid">
            {displayed.map((event, index) => (
              <li key={event.id} className="relative flex gap-3 pb-5 last:pb-0">
                {index !== displayed.length - 1 && (
                  <span className="absolute bottom-0 left-3.5 top-8 w-px bg-border/75" aria-hidden="true" />
                )}
                <span
                  className={`relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${index === 0 ? "bg-primary/12 text-primary" : "bg-muted/70 text-muted-foreground"}`}
                >
                  <ArrowDownRight className="size-3.5" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="wrap-anywhere text-xs leading-6 text-slate-300">{event.message}</p>
                  <time dateTime={event.at} className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock3 className="size-2.5" />
                    {formatActivityTime(event.at)}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="flex flex-col items-center py-10 text-center">
            <Activity className="mb-3 size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">첫 활동을 기다리고 있어요.</p>
          </div>
        )}
        <p className="mt-5 border-t border-white/5 pt-4 text-[10px] leading-5 text-muted-foreground">
          {compact && activity.length > 4
            ? `전체 ${activity.length}건 중 최신 4건`
            : "최근 활동은 최대 20건까지 보관됩니다."}
        </p>
      </CardContent>
    </Card>
  )
}
