import type { LucideIcon } from "lucide-react"

import { MetricHeadingLayout } from "./metric-heading-layout"
import { MetricIcon } from "./metric-icon"
import { MetricLabel } from "./metric-label"

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
