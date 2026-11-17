import type { Readiness } from "../../../../../core/domain/readiness"
import { ChecklistProgressCaption } from "./checklist-progress-caption"
import { ChecklistProgressCount } from "./checklist-progress-count"

type ChecklistProgressSummaryProps = {
  readiness: Readiness
}

export function ChecklistProgressSummary({ readiness }: ChecklistProgressSummaryProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-[10px] text-muted-foreground">
      <ChecklistProgressCaption />
      <ChecklistProgressCount readiness={readiness} />
    </div>
  )
}
