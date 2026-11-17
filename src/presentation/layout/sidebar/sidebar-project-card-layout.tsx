import type { ReactNode } from "react"

type SidebarProjectCardLayoutProps = {
  children: ReactNode
}

export function SidebarProjectCardLayout({ children }: SidebarProjectCardLayoutProps) {
  return (
    <div className="mb-8 mt-9 flex items-center gap-3 rounded-xl border border-white/7 bg-white/3 p-3">{children}</div>
  )
}
