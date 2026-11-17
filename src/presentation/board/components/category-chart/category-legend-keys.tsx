import { CategoryLegendKey } from "./category-legend-key"

export function CategoryLegendKeys() {
  return (
    <span className="flex items-center gap-3">
      <CategoryLegendKey label="완료" complete />
      <CategoryLegendKey label="미완료" />
    </span>
  )
}
