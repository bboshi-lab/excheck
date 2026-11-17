import type { Readiness } from "../../../../../core/domain/readiness"

import { ChecklistProgressCaption } from "./checklist-progress-caption"
import { ChecklistProgressCount } from "./checklist-progress-count"
import { ChecklistProgressSummaryLayout } from "./checklist-progress-summary-layout"

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
