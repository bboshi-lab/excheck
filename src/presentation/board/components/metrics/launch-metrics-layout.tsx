import type { ReactNode } from "react"

type LaunchMetricsLayoutProps = {
  children: ReactNode
}

export function LaunchMetricsLayout({ children }: LaunchMetricsLayoutProps) {
  return (
    <section className="grid grid-cols-3 gap-3 sm:gap-4" aria-label="출시 지표">
      {children}
    </section>
  )
}
