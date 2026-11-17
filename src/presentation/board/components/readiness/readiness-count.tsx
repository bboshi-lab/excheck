import type { Readiness } from "../../../../../core/domain/readiness"

type ReadinessCountProps = {
  readiness: Readiness
}

export function ReadinessCount({ readiness }: ReadinessCountProps) {
  return (
    <span className="mt-2 text-xs text-muted-foreground">
      {readiness.complete} / {readiness.total} 체크 완료
    </span>
  )
}
