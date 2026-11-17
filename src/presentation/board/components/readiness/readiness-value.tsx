import type { Readiness } from "../../../../../core/domain/readiness"

import { ReadinessCount } from "./readiness-count"
import { ReadinessLabel } from "./readiness-label"
import { ReadinessNumber } from "./readiness-number"
import { ReadinessValueLayout } from "./readiness-value-layout"

type ReadinessValueProps = {
  readiness: Readiness
}

export function ReadinessValue({ readiness }: ReadinessValueProps) {
  return (
    <ReadinessValueLayout>
      <ReadinessLabel />
      <ReadinessNumber percent={readiness.percent} />
      <ReadinessCount readiness={readiness} />
    </ReadinessValueLayout>
  )
}
