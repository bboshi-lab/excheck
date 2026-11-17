import type { ReactNode } from "react"

type MobileMenuLinksLayoutProps = {
  children: ReactNode
}

export function MobileMenuLinksLayout({ children }: MobileMenuLinksLayoutProps) {
  return <div className="px-5">{children}</div>
}
