import type { ReactNode } from "react"

type HeroMainProps = {
  children: ReactNode
}

export function HeroMain({ children }: HeroMainProps) {
  return (
    <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
      {children}
    </div>
  )
}
