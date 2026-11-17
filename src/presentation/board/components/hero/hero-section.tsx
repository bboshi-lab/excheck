import type { ReactNode } from "react"

type HeroSectionProps = {
  children: ReactNode
}

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <section
      className="release-hero relative overflow-hidden rounded-2xl border border-violet-300/15 p-6 sm:p-8"
      data-entrance
    >
      {children}
    </section>
  )
}
