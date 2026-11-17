import type { ReactNode } from "react"

type ReadinessValueLayoutProps = {
  children: ReactNode
}

export function ReadinessValueLayout({ children }: ReadinessValueLayoutProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
      {children}
    </div>
  )
}
