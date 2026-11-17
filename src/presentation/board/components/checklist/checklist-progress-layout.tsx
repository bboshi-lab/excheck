import type { ReactNode } from "react"

type ChecklistProgressLayoutProps = {
  children: ReactNode
}

export function ChecklistProgressLayout({ children }: ChecklistProgressLayoutProps) {
  return <div className="grid gap-3 bg-background/15 px-4 py-4 sm:px-6">{children}</div>
}
