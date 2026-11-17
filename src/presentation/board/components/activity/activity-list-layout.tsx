import type { ReactNode } from "react"

type ActivityListLayoutProps = {
  children: ReactNode
}

export function ActivityListLayout({ children }: ActivityListLayoutProps) {
  return (
    <ol aria-label="최근 활동" className="grid">
      {children}
    </ol>
  )
}
