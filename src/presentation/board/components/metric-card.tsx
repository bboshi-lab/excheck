import type { LucideIcon } from "lucide-react"
import { MetricDescription } from "@presentation/board/components/metrics/metric-description"
import { MetricHeading } from "@presentation/board/components/metrics/metric-heading"
import { MetricValue } from "@presentation/board/components/metrics/metric-value"
import { Card, CardContent } from "@ui/card"

type MetricCardProps = {
  label: string
  unit?: "개" | "건"
  value: number
  description: string
  icon: LucideIcon
  accent: "violet" | "cyan" | "amber"
}

export function MetricCard({ label, value, unit = "개", description, icon, accent }: MetricCardProps) {
  return (
    <Card
      role="group"
      aria-label={`${label} ${value}${unit}`}
      className="gap-0 border-white/7 bg-card/85 py-0 transition-colors hover:border-white/15"
      data-entrance
    >
      <CardContent className="p-3.5 sm:p-6">
        <MetricHeading label={label} icon={icon} accent={accent} />
        <MetricValue value={value} />
        <MetricDescription description={description} />
      </CardContent>
    </Card>
  )
}
