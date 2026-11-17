import type { Readiness } from "@core/domain/readiness"
import { ChecklistProgressCaption } from "@presentation/board/components/checklist/checklist-progress-caption"
import { ChecklistProgressCount } from "@presentation/board/components/checklist/checklist-progress-count"
import { ChecklistProgressSummaryLayout } from "@presentation/board/components/checklist/checklist-progress-summary-layout"

type ChecklistProgressSummaryProps = {
  readiness: Readiness
}

export function ChecklistProgressSummary({ readiness }: ChecklistProgressSummaryProps) {
  return (
    <ChecklistProgressSummaryLayout>
      <ChecklistProgressCaption />
      <ChecklistProgressCount readiness={readiness} />
    </ChecklistProgressSummaryLayout>
  )
}
