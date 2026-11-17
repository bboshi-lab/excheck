import { HeroFootnoteLayout } from "./hero-footnote-layout"
import { ReadinessExplanation } from "./readiness-explanation"
import { ReleaseReviewNote } from "./release-review-note"

export function HeroFootnote() {
  return (
    <HeroFootnoteLayout>
      <ReadinessExplanation />
      <ReleaseReviewNote />
    </HeroFootnoteLayout>
  )
}
