import type { Readiness } from "@core/domain/readiness"
import { HeroActions } from "@presentation/board/components/hero/hero-actions"
import { HeroContentLayout } from "@presentation/board/components/hero/hero-content-layout"
import { HeroDescription } from "@presentation/board/components/hero/hero-description"
import { HeroHeadline } from "@presentation/board/components/hero/hero-headline"
import { HeroProjectStatus } from "@presentation/board/components/hero/hero-project-status"

type HeroContentProps = {
  readiness: Readiness
}

export function HeroContent({ readiness }: HeroContentProps) {
  return (
    <HeroContentLayout>
      <HeroProjectStatus readiness={readiness} />
      <HeroHeadline />
      <HeroDescription />
      <HeroActions remaining={readiness.total - readiness.complete} />
    </HeroContentLayout>
  )
}
