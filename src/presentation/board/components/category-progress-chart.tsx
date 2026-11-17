import type { Task } from "../../../../core/domain/task"
import { summarizeCategories } from "../../../../core/domain/board-metrics"
import { CategoryChartCard } from "./category-chart/category-chart-card"
import { CategoryChartHeader } from "./category-chart/category-chart-header"
import { CategoryChartContent } from "./category-chart/category-chart-content"

type CategoryProgressChartProps = {
  tasks: Task[]
}

export function CategoryProgressChart({ tasks }: CategoryProgressChartProps) {
  const summaries = summarizeCategories(tasks)

  return (
    <CategoryChartCard>
      <CategoryChartHeader />
      <CategoryChartContent summaries={summaries} />
    </CategoryChartCard>
  )
}
