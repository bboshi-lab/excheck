import type { ReactNode } from "react"

type TaskItemContentProps = {
  children: ReactNode
}

export function TaskItemContent({ children }: TaskItemContentProps) {
  return <div className="flex items-center gap-3">{children}</div>
}
