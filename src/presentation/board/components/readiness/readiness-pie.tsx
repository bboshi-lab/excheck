import { Pie, PieChart } from "recharts"

import type { Readiness } from "../../../../../core/domain/readiness"

import { ChartContainer, type ChartConfig } from "../../../ui/chart"

import { useReducedMotion } from "../../../hooks/use-reduced-motion"

const chartConfig = {
  complete: { label: "완료", color: "var(--chart-1)" },
  remaining: { label: "남은 항목", color: "var(--border)" },
} satisfies ChartConfig

type ReadinessPieProps = {
  readiness: Readiness
}

export function ReadinessPie({ readiness }: ReadinessPieProps) {
  const reducedMotion = useReducedMotion()
  const data = readiness.total
    ? [
        { name: "완료", count: readiness.complete, fill: "var(--chart-1)" },
        { name: "남은 항목", count: readiness.total - readiness.complete, fill: "var(--border)" },
      ]
    : [{ name: "항목 대기", count: 1, fill: "var(--border)" }]

  return (
    <ChartContainer
      config={chartConfig}
      className="chart-pulse absolute inset-0 aspect-square size-full"
      aria-hidden="true"
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          innerRadius="72%"
          outerRadius="81%"
          startAngle={90}
          endAngle={-270}
          strokeWidth={0}
          cornerRadius={9}
          isAnimationActive={!reducedMotion}
          animationDuration={900}
        />
      </PieChart>
    </ChartContainer>
  )
}
