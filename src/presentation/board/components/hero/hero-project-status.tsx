import type { Readiness } from "@core/domain/readiness"
import { HeroProjectLabel } from "@presentation/board/components/hero/hero-project-label"
import { HeroProjectStatusLayout } from "@presentation/board/components/hero/hero-project-status-layout"
import { HeroStatusBadge } from "@presentation/board/components/hero/hero-status-badge"

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
