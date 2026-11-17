import type { ReactNode } from "react"

type DemoResetNoticeLayoutProps = {
  children: ReactNode
}

export function DemoResetNoticeLayout({ children }: DemoResetNoticeLayoutProps) {
  return (
    <div
      data-entrance
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/2 px-5 py-4 text-[11px] text-muted-foreground"
    >
      {children}
    </div>
  )
}
