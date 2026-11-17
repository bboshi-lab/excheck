import type { ReactNode } from "react"

type ChecklistProgressSummaryLayoutProps = {
  children: ReactNode
}

export function ChecklistProgressSummaryLayout({ children }: ChecklistProgressSummaryLayoutProps) {
  return <div className="flex items-center justify-between gap-3 text-[10px] text-muted-foreground">{children}</div>
}
