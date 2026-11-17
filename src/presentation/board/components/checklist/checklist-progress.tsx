import type { Readiness } from "../../../../../core/domain/readiness"
import { Progress } from "../../../ui/progress"
import { ChecklistProgressSummary } from "./checklist-progress-summary"

type ChecklistProgressProps = {
  readiness: Readiness
}

export function ChecklistProgress({ readiness }: ChecklistProgressProps) {
  return (
    <div className="grid gap-3 bg-background/15 px-4 py-4 sm:px-6">
      <ChecklistProgressSummary readiness={readiness} />
      <Progress
        value={readiness.percent}
        aria-label="전체 체크 완료율"
        className="h-1 bg-white/5 [&>div]:bg-linear-to-r [&>div]:from-violet-400 [&>div]:to-cyan-300 [&>div]:transition-transform [&>div]:duration-500"
      />
    </div>
  )
}
