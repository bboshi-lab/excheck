import type { Readiness } from "../../../../../core/domain/readiness"
import { HeroStatusBadge } from "./hero-status-badge"
import { HeroProjectLabel } from "./hero-project-label"

type HeroProjectStatusProps = {
  readiness: Readiness
}

export function HeroProjectStatus({ readiness }: HeroProjectStatusProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <HeroStatusBadge readiness={readiness} />
      <HeroProjectLabel />
    </div>
  )
}
