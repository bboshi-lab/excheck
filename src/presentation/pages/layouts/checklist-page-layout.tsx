import type { ReactNode, Ref } from "react"

type ChecklistPageLayoutProps = {
  children: ReactNode
  ref: Ref<HTMLDivElement>
}

export function ChecklistPageLayout({ children, ref }: ChecklistPageLayoutProps) {
  return (
    <div ref={ref} className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
      {children}
    </div>
  )
}
