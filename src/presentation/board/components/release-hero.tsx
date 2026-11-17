import { calculateReadiness } from "@core/domain/readiness"
import type { Task } from "@core/domain/task"
import { HeroBackdrop } from "@presentation/board/components/hero/hero-backdrop"
import { HeroContent } from "@presentation/board/components/hero/hero-content"
import { HeroFootnote } from "@presentation/board/components/hero/hero-footnote"
import { HeroMain } from "@presentation/board/components/hero/hero-main"
import { HeroSection } from "@presentation/board/components/hero/hero-section"
import { ReadinessRing } from "@presentation/board/components/readiness-ring"

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
