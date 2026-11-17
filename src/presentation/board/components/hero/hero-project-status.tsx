import type { Readiness } from "../../../../../core/domain/readiness"

import { HeroProjectLabel } from "./hero-project-label"
import { HeroProjectStatusLayout } from "./hero-project-status-layout"
import { HeroStatusBadge } from "./hero-status-badge"

type HeroProjectStatusProps = {
  readiness: Readiness
}

export function HeroProjectStatus({ readiness }: HeroProjectStatusProps) {
  return (
    <HeroProjectStatusLayout>
      <HeroStatusBadge readiness={readiness} />
      <HeroProjectLabel />
    </HeroProjectStatusLayout>
  )
}
