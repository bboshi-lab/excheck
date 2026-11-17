import type { ReactNode } from "react"

type CategoryChartLegendLayoutProps = {
  children: ReactNode
}

export function CategoryChartLegendLayout({ children }: CategoryChartLegendLayoutProps) {
  return (
    <div className="mt-4 flex justify-between border-t border-white/5 pt-4 text-[11px] text-muted-foreground">
      {children}
    </div>
  )
}
