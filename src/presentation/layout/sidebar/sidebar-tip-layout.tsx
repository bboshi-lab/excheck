import type { ReactNode } from "react"

type SidebarTipLayoutProps = {
  children: ReactNode
}

export function SidebarTipLayout({ children }: SidebarTipLayoutProps) {
  return (
    <div className="rounded-xl border border-primary/10 bg-linear-to-br from-primary/8 to-transparent p-4">
      {children}
    </div>
  )
}
