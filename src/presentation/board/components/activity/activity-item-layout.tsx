import type { ReactNode } from "react"

type ActivityItemLayoutProps = {
  children: ReactNode
}

export function ActivityItemLayout({ children }: ActivityItemLayoutProps) {
  return <li className="relative flex gap-3 pb-5 last:pb-0">{children}</li>
}
