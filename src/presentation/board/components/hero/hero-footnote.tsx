import { HeroFootnoteLayout } from "@presentation/board/components/hero/hero-footnote-layout"
import { ReadinessExplanation } from "@presentation/board/components/hero/readiness-explanation"
import { ReleaseReviewNote } from "@presentation/board/components/hero/release-review-note"

export function HeroFootnote() {
  return (
    <HeroFootnoteLayout>
      <ReadinessExplanation />
      <ReleaseReviewNote />
    </HeroFootnoteLayout>
  )
}
