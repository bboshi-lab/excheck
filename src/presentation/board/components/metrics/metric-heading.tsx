import type { LucideIcon } from "lucide-react"
import { MetricHeadingLayout } from "@presentation/board/components/metrics/metric-heading-layout"
import { MetricIcon } from "@presentation/board/components/metrics/metric-icon"
import { MetricLabel } from "@presentation/board/components/metrics/metric-label"

type MetricHeadingProps = {
  label: string
  icon: LucideIcon
  accent: "violet" | "cyan" | "amber"
}

export function MetricHeading({ label, icon, accent }: MetricHeadingProps) {
  return (
    <MetricHeadingLayout>
      <MetricLabel label={label} />
      <MetricIcon icon={icon} accent={accent} />
    </MetricHeadingLayout>
  )
}
