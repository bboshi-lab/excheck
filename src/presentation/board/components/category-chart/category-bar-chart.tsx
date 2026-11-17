import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { CategorySummary } from "../../../../../core/domain/board-metrics"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../../../ui/chart"
import { useReducedMotion } from "../../../hooks/use-reduced-motion"
import { categoryLabels } from "../../labels"

const chartConfig = {
  complete: { label: "완료", color: "var(--chart-1)" },
  remaining: { label: "미완료", color: "var(--muted)" },
} satisfies ChartConfig

type CategoryBarChartProps = {
  summaries: CategorySummary[]
}

export function CategoryBarChart({ summaries }: CategoryBarChartProps) {
  const reducedMotion = useReducedMotion()
  const data = summaries.map((summary) => ({ ...summary, label: categoryLabels[summary.category] }))

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-40 min-w-0 w-full"
      role="img"
      aria-label="분야별 완료·미완료 체크 수"
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: -20, right: 0, top: 5, bottom: 5 }}
        barSize={12}
        accessibilityLayer
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 5" vertical stroke="var(--border)" />
        <XAxis type="number" allowDecimals={false} hide />
        <YAxis dataKey="label" type="category" tickLine={false} axisLine={false} width={65} tick={{ fontSize: 11 }} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar
          dataKey="complete"
          stackId="tasks"
          fill="var(--color-complete)"
          radius={4}
          isAnimationActive={!reducedMotion}
        />
        <Bar
          dataKey="remaining"
          stackId="tasks"
          fill="var(--color-remaining)"
          radius={4}
          isAnimationActive={!reducedMotion}
        />
      </BarChart>
    </ChartContainer>
  )
}
