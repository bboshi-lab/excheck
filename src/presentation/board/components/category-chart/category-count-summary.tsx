import type { CategorySummary } from "../../../../../core/domain/board-metrics"

import { CategoryCountItem } from "./category-count-item"
import { CategoryCountListLayout } from "./category-count-list-layout"

type CategoryCountSummaryProps = {
  summaries: CategorySummary[]
}

export function CategoryCountSummary({ summaries }: CategoryCountSummaryProps) {
  return (
    <CategoryCountListLayout>
      {summaries.map((summary) => (
        <CategoryCountItem key={summary.category} summary={summary} />
      ))}
    </CategoryCountListLayout>
  )
}
