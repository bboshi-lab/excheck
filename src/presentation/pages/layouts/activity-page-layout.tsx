import type { ReactNode } from "react"

type ActivityPageLayoutProps = {
  children: ReactNode
}

export function ActivityPageLayout({ children }: ActivityPageLayoutProps) {
  return <div className="max-w-3xl">{children}</div>
}
