import { CategoryLegendKey } from "@presentation/board/components/category-chart/category-legend-key"
import { CategoryLegendKeysLayout } from "@presentation/board/components/category-chart/category-legend-keys-layout"

export function CategoryLegendKeys() {
  return (
    <CategoryLegendKeysLayout>
      <CategoryLegendKey label="완료" complete />
      <CategoryLegendKey label="미완료" />
    </CategoryLegendKeysLayout>
  )
}
