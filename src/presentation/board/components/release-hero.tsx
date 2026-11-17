import { calculateReadiness } from "../../../../core/domain/readiness"
import type { Task } from "../../../../core/domain/task"

import { HeroBackdrop } from "./hero/hero-backdrop"
import { HeroContent } from "./hero/hero-content"
import { HeroFootnote } from "./hero/hero-footnote"
import { HeroMain } from "./hero/hero-main"
import { HeroSection } from "./hero/hero-section"
import { ReadinessRing } from "./readiness-ring"

type ReleaseHeroProps = {
  tasks: Task[]
}

export function ReleaseHero({ tasks }: ReleaseHeroProps) {
  const readiness = calculateReadiness(tasks)

  return (
    <HeroSection>
      <HeroBackdrop />
      <HeroMain>
        <HeroContent readiness={readiness} />
        <ReadinessRing readiness={readiness} />
      </HeroMain>
      <HeroFootnote />
    </HeroSection>
  )
}
