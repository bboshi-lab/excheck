import type { ReactNode } from "react"

type ActivityDetailsLayoutProps = {
  children: ReactNode
}

export function ActivityDetailsLayout({ children }: ActivityDetailsLayoutProps) {
  return <div className="min-w-0 pt-0.5">{children}</div>
}
