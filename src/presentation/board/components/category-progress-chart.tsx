import { summarizeCategories } from "@core/domain/board-metrics"
import type { Task } from "@core/domain/task"
import { CategoryChartCard } from "@presentation/board/components/category-chart/category-chart-card"
import { CategoryChartContent } from "@presentation/board/components/category-chart/category-chart-content"
import { CategoryChartHeader } from "@presentation/board/components/category-chart/category-chart-header"

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
