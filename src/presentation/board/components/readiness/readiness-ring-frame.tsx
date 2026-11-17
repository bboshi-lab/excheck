import type { ReactNode } from "react"
import type { Readiness } from "@core/domain/readiness"

type ReadinessRingFrameProps = {
  children: ReactNode
  readiness: Readiness
}

export function ReadinessRingFrame({ children, readiness }: ReadinessRingFrameProps) {
  return (
    <div
      className="relative isolate mx-auto size-52 shrink-0 sm:size-56"
      role="img"
      aria-label={`출시 준비율 ${readiness.percent}%, ${readiness.total}개 중 ${readiness.complete}개 완료`}
    >
      {children}
    </div>
  )
}
