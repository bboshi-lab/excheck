import { ReadinessExplanation } from "./readiness-explanation"
import { ReleaseReviewNote } from "./release-review-note"

export function HeroFootnote() {
  return (
    <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/7 pt-4 text-[10px] text-slate-400">
      <ReadinessExplanation />
      <ReleaseReviewNote />
    </div>
  )
}
