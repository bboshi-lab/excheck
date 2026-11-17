import type { ReactNode, Ref } from "react"

type DashboardLayoutProps = {
  children: ReactNode
  ref: Ref<HTMLDivElement>
}

export function DashboardLayout({ children, ref }: DashboardLayoutProps) {
  return (
    <div ref={ref} className="grid gap-5 sm:gap-6">
      {children}
    </div>
  )
}
