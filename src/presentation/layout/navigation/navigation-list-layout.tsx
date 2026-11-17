import type { ReactNode } from "react"

type NavigationListLayoutProps = {
  children: ReactNode
}

export function NavigationListLayout({ children }: NavigationListLayoutProps) {
  return (
    <nav aria-label="주 메뉴" className="grid gap-1.5">
      {children}
    </nav>
  )
}
