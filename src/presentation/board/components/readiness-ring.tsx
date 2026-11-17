import type { Readiness } from "../../../../core/domain/readiness"

import { ReadinessPie } from "./readiness/readiness-pie"
import { ReadinessRingDecoration } from "./readiness/readiness-ring-decoration"
import { ReadinessRingFrame } from "./readiness/readiness-ring-frame"
import { ReadinessValue } from "./readiness/readiness-value"

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
