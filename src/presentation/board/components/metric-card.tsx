import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "../../ui/card"
import { useAnimatedNumber } from "../../hooks/use-animated-number"

const accentClasses = {
  violet: "bg-violet-400/10 text-violet-300",
  cyan: "bg-cyan-400/10 text-cyan-300",
  amber: "bg-amber-400/10 text-amber-300",
}

type MetricCardProps = {
  label: string
  unit?: "개" | "건"
  value: number
  description: string
  icon: LucideIcon
  accent: "violet" | "cyan" | "amber"
}

export function MetricCard({ label, value, unit = "개", description, icon: Icon, accent }: MetricCardProps) {
  const displayed = useAnimatedNumber(value)

  return (
    <Card
      role="group"
      aria-label={`${label} ${value}${unit}`}
      className="gap-0 border-white/7 bg-card/85 py-0 transition-colors hover:border-white/15"
      data-entrance
    >
      <CardContent className="p-3.5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[11px] font-medium text-muted-foreground sm:text-xs">{label}</h2>
          <span className={`hidden rounded-lg p-2 sm:inline-flex ${accentClasses[accent]}`}>
            <Icon className="size-4" />
          </span>
        </div>
        <p className="metric-number mt-3 text-3xl font-semibold sm:mt-2 sm:text-4xl">
          <span aria-hidden="true">{String(displayed).padStart(2, "0")}</span>
        </p>
        <p className="mt-2 hidden text-[11px] leading-5 text-muted-foreground sm:block">{description}</p>
      </CardContent>
    </Card>
  )
}
