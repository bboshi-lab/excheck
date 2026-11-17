import type { CategorySummary } from "../../../../../core/domain/board-metrics"

import { CardContent } from "../../../ui/card"

import { CategoryBarChart } from "./category-bar-chart"
import { CategoryChartLegend } from "./category-chart-legend"
import { CategoryCountSummary } from "./category-count-summary"

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
