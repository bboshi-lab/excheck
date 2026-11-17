import { CategoryLegendKey } from "./category-legend-key"
import { CategoryLegendKeysLayout } from "./category-legend-keys-layout"

export function CategoryLegendKeys() {
  return (
    <CategoryLegendKeysLayout>
      <CategoryLegendKey label="완료" complete />
      <CategoryLegendKey label="미완료" />
    </CategoryLegendKeysLayout>
  )
}
