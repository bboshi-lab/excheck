import type { ReactNode } from "react"

type SidebarFooterLayoutProps = {
  children: ReactNode
}

export function SidebarFooterLayout({ children }: SidebarFooterLayoutProps) {
  return <div className="mt-auto pt-10">{children}</div>
}
