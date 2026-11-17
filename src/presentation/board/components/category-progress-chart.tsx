import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartNoAxesCombined } from "lucide-react"
import type { Task } from "../../../../core/domain/task"
import { summarizeCategories } from "../../../../core/domain/board-metrics"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../../ui/chart"
import { useReducedMotion } from "../../hooks/use-reduced-motion"
import { categoryLabels } from "../labels"

const chartConfig = {
  complete: { label: "완료", color: "var(--chart-1)" },
  remaining: { label: "미완료", color: "var(--muted)" },
} satisfies ChartConfig

type CategoryProgressChartProps = {
  tasks: Task[]
}

export function CategoryProgressChart({ tasks }: CategoryProgressChartProps) {
  const reducedMotion = useReducedMotion()
  const data = summarizeCategories(tasks).map((summary) => ({ ...summary, label: categoryLabels[summary.category] }))

  return (
    <Card className="min-w-0 gap-3 border-white/7 bg-card/85" data-entrance>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardDescription className="mb-2 text-[10px] tracking-widest">분야별 진행 상황</CardDescription>
          <CardTitle role="heading" aria-level={2} className="text-base">
            분야별 준비 현황
          </CardTitle>
        </div>
        <ChartNoAxesCombined className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
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
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={65}
              tick={{ fontSize: 11 }}
            />
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
        <div className="mt-4 flex justify-between border-t border-white/5 pt-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-chart-1" />
            완료
            <span className="ml-2 size-1.5 rounded-full bg-muted" />
            미완료
          </span>
          <span>실시간 체크 데이터</span>
        </div>
        <table className="sr-only">
          <caption>분야별 체크 집계</caption>
          <thead>
            <tr>
              <th>분야</th>
              <th>완료</th>
              <th>미완료</th>
              <th>전체</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.category}>
                <th>{item.label}</th>
                <td>{item.complete}</td>
                <td>{item.remaining}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
