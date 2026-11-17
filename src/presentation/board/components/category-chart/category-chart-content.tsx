import type { CategorySummary } from "@core/domain/board-metrics"
import { CategoryBarChart } from "@presentation/board/components/category-chart/category-bar-chart"
import { CategoryChartLegend } from "@presentation/board/components/category-chart/category-chart-legend"
import { CategoryCountSummary } from "@presentation/board/components/category-chart/category-count-summary"
import { CardContent } from "@ui/card"

type CategoryChartContentProps = {
  summaries: CategorySummary[]
}

export function CategoryChartContent({ summaries }: CategoryChartContentProps) {
  return (
    <CardContent>
      <CategoryBarChart summaries={summaries} />
      <CategoryChartLegend />
      <CategoryCountSummary summaries={summaries} />
    </CardContent>
  )
}
