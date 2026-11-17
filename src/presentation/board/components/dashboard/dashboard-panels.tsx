import type { ReactNode } from "react"

type DashboardPanelsProps = {
  children: ReactNode
}

export function DashboardPanels({ children }: DashboardPanelsProps) {
  return <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] xl:gap-6">{children}</div>
}
