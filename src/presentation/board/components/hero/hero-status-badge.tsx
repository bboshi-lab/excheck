import { Radio } from "lucide-react"
import type { Readiness } from "@core/domain/readiness"
import { Badge } from "@ui/badge"

type HeroStatusBadgeProps = {
  readiness: Readiness
}

export function HeroStatusBadge({ readiness }: HeroStatusBadgeProps) {
  const status = !readiness.total
    ? "체크를 등록해 보세요"
    : readiness.complete < readiness.total
      ? "출시 준비 중"
      : "모든 체크 완료"

  return (
    <Badge variant="outline" className="gap-1.5 border-primary/25 bg-primary/10 py-1 text-[10px] text-violet-200">
      <Radio className="size-3" />
      {status}
    </Badge>
  )
}
