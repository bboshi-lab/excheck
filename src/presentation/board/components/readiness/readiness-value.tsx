import type { Readiness } from "@core/domain/readiness"
import { ReadinessCount } from "@presentation/board/components/readiness/readiness-count"
import { ReadinessLabel } from "@presentation/board/components/readiness/readiness-label"
import { ReadinessNumber } from "@presentation/board/components/readiness/readiness-number"
import { ReadinessValueLayout } from "@presentation/board/components/readiness/readiness-value-layout"

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
