import type { ReactNode } from "react"

type SidebarFrameProps = {
  children: ReactNode
}

export function SidebarFrame({ children }: SidebarFrameProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-white/7 bg-[#0e121e] px-5 py-7 lg:flex xl:w-64 xl:px-6">
      {children}
    </aside>
  )
}
