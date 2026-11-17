import type { Readiness } from "@core/domain/readiness"
import { ReadinessPie } from "@presentation/board/components/readiness/readiness-pie"
import { ReadinessRingDecoration } from "@presentation/board/components/readiness/readiness-ring-decoration"
import { ReadinessRingFrame } from "@presentation/board/components/readiness/readiness-ring-frame"
import { ReadinessValue } from "@presentation/board/components/readiness/readiness-value"

type ReadinessRingProps = {
  readiness: Readiness
}

export function ReadinessRing({ readiness }: ReadinessRingProps) {
  return (
    <ReadinessRingFrame readiness={readiness}>
      <ReadinessRingDecoration />
      <ReadinessPie readiness={readiness} />
      <ReadinessValue readiness={readiness} />
    </ReadinessRingFrame>
  )
}
