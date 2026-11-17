import type { ReactNode } from "react"

type DashboardInsightsProps = {
  children: ReactNode
}

export function DashboardInsights({ children }: DashboardInsightsProps) {
  return <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-1 xl:gap-6">{children}</div>
}
