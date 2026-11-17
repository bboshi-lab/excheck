import type { Readiness } from "../../../../../core/domain/readiness"
import { ReadinessLabel } from "./readiness-label"
import { ReadinessNumber } from "./readiness-number"
import { ReadinessCount } from "./readiness-count"

type ReadinessValueProps = {
  readiness: Readiness
}

export function ReadinessValue({ readiness }: ReadinessValueProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
      <ReadinessLabel />
      <ReadinessNumber percent={readiness.percent} />
      <ReadinessCount readiness={readiness} />
    </div>
  )
}
