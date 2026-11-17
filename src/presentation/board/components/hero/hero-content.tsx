import type { Readiness } from "../../../../../core/domain/readiness"
import { HeroProjectStatus } from "./hero-project-status"
import { HeroHeadline } from "./hero-headline"
import { HeroDescription } from "./hero-description"
import { HeroActions } from "./hero-actions"

type HeroContentProps = {
  readiness: Readiness
}

export function HeroContent({ readiness }: HeroContentProps) {
  return (
    <div className="max-w-md">
      <HeroProjectStatus readiness={readiness} />
      <HeroHeadline />
      <HeroDescription />
      <HeroActions remaining={readiness.total - readiness.complete} />
    </div>
  )
}
