import type { Task } from "../../../../core/domain/task"
import { calculateReadiness } from "../../../../core/domain/readiness"
import { ReadinessRing } from "./readiness-ring"
import { HeroSection } from "./hero/hero-section"
import { HeroBackdrop } from "./hero/hero-backdrop"
import { HeroMain } from "./hero/hero-main"
import { HeroContent } from "./hero/hero-content"
import { HeroFootnote } from "./hero/hero-footnote"

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
