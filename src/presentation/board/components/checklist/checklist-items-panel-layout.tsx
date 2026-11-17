import type { ReactNode } from "react"

import type { TaskFilter } from "../../state/filter-store"

type ChecklistItemsPanelLayoutProps = {
  children: ReactNode
  panelId: string
  category: TaskFilter
}

export function ChecklistItemsPanelLayout({ children, panelId, category }: ChecklistItemsPanelLayoutProps) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={`${panelId}-${category}`}
      tabIndex={0}
      className="border-y border-white/5 bg-background/10"
    >
      {children}
    </div>
  )
}
