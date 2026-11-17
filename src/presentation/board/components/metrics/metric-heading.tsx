import type { LucideIcon } from "lucide-react"
import { MetricIcon } from "./metric-icon"
import { MetricLabel } from "./metric-label"

type MetricHeadingProps = {
  label: string
  icon: LucideIcon
  accent: "violet" | "cyan" | "amber"
}

export function MetricHeading({ label, icon, accent }: MetricHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <MetricLabel label={label} />
      <MetricIcon icon={icon} accent={accent} />
    </div>
  )
}
