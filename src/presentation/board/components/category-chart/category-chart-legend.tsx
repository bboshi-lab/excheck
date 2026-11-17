import { CategoryChartLegendLayout } from "./category-chart-legend-layout"
import { CategoryDataSource } from "./category-data-source"
import { CategoryLegendKeys } from "./category-legend-keys"

export function CategoryChartLegend() {
  return (
    <CategoryChartLegendLayout>
      <CategoryLegendKeys />
      <CategoryDataSource />
    </CategoryChartLegendLayout>
  )
}
