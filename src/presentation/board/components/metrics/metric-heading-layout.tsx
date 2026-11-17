import type { ReactNode } from "react"

type MetricHeadingLayoutProps = {
  children: ReactNode
}

export function MetricHeadingLayout({ children }: MetricHeadingLayoutProps) {
  return <div className="flex items-center justify-between gap-2">{children}</div>
}
