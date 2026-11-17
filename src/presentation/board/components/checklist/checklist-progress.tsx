import type { Readiness } from "@core/domain/readiness"
import { ChecklistProgressLayout } from "@presentation/board/components/checklist/checklist-progress-layout"
import { ChecklistProgressSummary } from "@presentation/board/components/checklist/checklist-progress-summary"
import { Progress } from "@ui/progress"

type ChecklistProgressProps = {
  readiness: Readiness
}

export function ChecklistProgress({ readiness }: ChecklistProgressProps) {
  return (
    <ChecklistProgressLayout>
      <ChecklistProgressSummary readiness={readiness} />
      <Progress
        value={readiness.percent}
        aria-label="전체 체크 완료율"
        className="h-1 bg-white/5 [&>div]:bg-linear-to-r [&>div]:from-violet-400 [&>div]:to-cyan-300 [&>div]:transition-transform [&>div]:duration-500"
      />
    </ChecklistProgressLayout>
  )
}
