import type { CategorySummary } from "../../../../../core/domain/board-metrics"

import { categoryLabels } from "../../labels"

type CategoryCountItemProps = {
  summary: CategorySummary
}

export function CategoryCountItem({ summary }: CategoryCountItemProps) {
  const message = `${categoryLabels[summary.category]}: 완료 ${summary.complete}개, 미완료 ${summary.remaining}개, 전체 ${summary.total}개`

  return <li>{message}</li>
}
