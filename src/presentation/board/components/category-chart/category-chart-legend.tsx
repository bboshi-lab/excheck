import { CategoryChartLegendLayout } from "@presentation/board/components/category-chart/category-chart-legend-layout"
import { CategoryDataSource } from "@presentation/board/components/category-chart/category-data-source"
import { CategoryLegendKeys } from "@presentation/board/components/category-chart/category-legend-keys"

export function CategoryChartLegend() {
  return (
    <CategoryChartLegendLayout>
      <CategoryLegendKeys />
      <CategoryDataSource />
    </CategoryChartLegendLayout>
  )
}
