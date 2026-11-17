import type { ReactNode } from "react"

type WorkspaceFooterLayoutProps = {
  children: ReactNode
}

export function WorkspaceFooterLayout({ children }: WorkspaceFooterLayoutProps) {
  return (
    <footer className="mt-9 flex flex-wrap items-center justify-between gap-2 border-t border-white/6 pt-5 text-[9px] tracking-wide text-muted-foreground">
      {children}
    </footer>
  )
}
