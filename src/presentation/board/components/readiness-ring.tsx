import { Pie, PieChart } from "recharts"
import type { Readiness } from "../../../../core/domain/readiness"
import { ChartContainer, type ChartConfig } from "../../ui/chart"
import { useReducedMotion } from "../../hooks/use-reduced-motion"
import { useAnimatedNumber } from "../../hooks/use-animated-number"

const chartConfig = {
  complete: { label: "완료", color: "var(--chart-1)" },
  remaining: { label: "남은 항목", color: "var(--border)" },
} satisfies ChartConfig

type ReadinessRingProps = {
  readiness: Readiness
}

export function ReadinessRing({ readiness }: ReadinessRingProps) {
  const reducedMotion = useReducedMotion()
  const displayedPercent = useAnimatedNumber(readiness.percent)
  const data = readiness.total
    ? [
        { name: "완료", count: readiness.complete, fill: "var(--chart-1)" },
        { name: "남은 항목", count: readiness.total - readiness.complete, fill: "var(--border)" },
      ]
    : [{ name: "항목 대기", count: 1, fill: "var(--border)" }]

  return (
    <div
      className="relative isolate mx-auto size-52 shrink-0 sm:size-56"
      role="img"
      aria-label={`출시 준비율 ${readiness.percent}%, ${readiness.total}개 중 ${readiness.complete}개 완료`}
    >
      <div className="absolute inset-0 rounded-full border border-primary/10" />
      <div className="absolute inset-3 rounded-full border border-dashed border-primary/15" />
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
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        aria-hidden="true"
      >
        <span className="mb-1 text-[10px] font-medium tracking-[0.2em] text-violet-200/65">출시 준비율</span>
        <strong className="metric-number text-5xl font-semibold sm:text-6xl">
          {displayedPercent}
          <span className="ml-1 text-xl font-normal text-primary">%</span>
        </strong>
        <span className="mt-2 text-xs text-muted-foreground">
          {readiness.complete} / {readiness.total} 체크 완료
        </span>
      </div>
    </div>
  )
}
