import type { Readiness } from "../../../../../core/domain/readiness"

import { HeroActions } from "./hero-actions"
import { HeroContentLayout } from "./hero-content-layout"
import { HeroDescription } from "./hero-description"
import { HeroHeadline } from "./hero-headline"
import { HeroProjectStatus } from "./hero-project-status"

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
