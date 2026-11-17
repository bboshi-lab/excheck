import { CategoryLegendKeys } from "./category-legend-keys"
import { CategoryDataSource } from "./category-data-source"

export function CategoryChartLegend() {
  return (
    <div className="mt-4 flex justify-between border-t border-white/5 pt-4 text-[11px] text-muted-foreground">
      <CategoryLegendKeys />
      <CategoryDataSource />
    </div>
  )
}
