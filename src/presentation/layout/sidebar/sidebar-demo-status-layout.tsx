import type { ReactNode } from "react"

type SidebarDemoStatusLayoutProps = {
  children: ReactNode
}

export function SidebarDemoStatusLayout({ children }: SidebarDemoStatusLayoutProps) {
  return <div className="flex items-center gap-3">{children}</div>
}
