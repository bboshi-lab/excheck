import type { CategorySummary } from "../../../../../core/domain/board-metrics"
import { CategoryCountItem } from "./category-count-item"

type CategoryCountSummaryProps = {
  summaries: CategorySummary[]
}

export function CategoryCountSummary({ summaries }: CategoryCountSummaryProps) {
  return (
    <ul aria-label="분야별 체크 집계" className="sr-only">
      {summaries.map((summary) => (
        <CategoryCountItem key={summary.category} summary={summary} />
      ))}
    </ul>
  )
}
