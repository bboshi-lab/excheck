import type { ReactNode } from "react"

type HeroActionsLayoutProps = {
  children: ReactNode
}

export function HeroActionsLayout({ children }: HeroActionsLayoutProps) {
  return <div className="mt-6 flex flex-wrap items-center gap-4">{children}</div>
}
