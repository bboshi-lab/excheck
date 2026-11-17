import type { ReactNode } from "react"

type DashboardActivityLayoutProps = {
  children: ReactNode
}

export function DashboardActivityLayout({ children }: DashboardActivityLayoutProps) {
  return <div className="grid gap-2">{children}</div>
}
