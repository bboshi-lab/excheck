import type { CategorySummary } from "@core/domain/board-metrics"
import { CategoryCountItem } from "@presentation/board/components/category-chart/category-count-item"
import { CategoryCountListLayout } from "@presentation/board/components/category-chart/category-count-list-layout"

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
