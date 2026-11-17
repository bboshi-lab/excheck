import type { ReactNode } from "react"

type HeroContentLayoutProps = {
  children: ReactNode
}

export function HeroContentLayout({ children }: HeroContentLayoutProps) {
  return <div className="max-w-md">{children}</div>
}
