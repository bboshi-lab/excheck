import type { ReactNode } from "react"

type WorkspaceHeaderLayoutProps = {
  children: ReactNode
}

export function WorkspaceHeaderLayout({ children }: WorkspaceHeaderLayoutProps) {
  return (
    <header className="flex h-17 items-center justify-between gap-3 border-b border-white/6 px-4 sm:px-8 xl:px-10">
      {children}
    </header>
  )
}
