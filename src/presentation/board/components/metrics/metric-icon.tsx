import type { LucideIcon } from "lucide-react"

const accentClasses = {
  violet: "bg-violet-400/10 text-violet-300",
  cyan: "bg-cyan-400/10 text-cyan-300",
  amber: "bg-amber-400/10 text-amber-300",
}

type MetricIconProps = {
  icon: LucideIcon
  accent: keyof typeof accentClasses
}

export function MetricIcon({ icon: Icon, accent }: MetricIconProps) {
  return (
    <span className={`hidden rounded-lg p-2 sm:inline-flex ${accentClasses[accent]}`}>
      <Icon className="size-4" />
    </span>
  )
}
