import type { ReactNode } from "react"

type HeroProjectStatusLayoutProps = {
  children: ReactNode
}

export function HeroProjectStatusLayout({ children }: HeroProjectStatusLayoutProps) {
  return <div className="mb-5 flex flex-wrap items-center gap-3">{children}</div>
}
