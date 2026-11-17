import type { ReactNode } from "react"

type MobileHeaderIdentityLayoutProps = {
  children: ReactNode
}

export function MobileHeaderIdentityLayout({ children }: MobileHeaderIdentityLayoutProps) {
  return <div className="flex items-center gap-3 lg:hidden">{children}</div>
}
