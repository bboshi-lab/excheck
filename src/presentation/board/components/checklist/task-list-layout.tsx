import type { ReactNode } from "react"

type TaskListLayoutProps = {
  children: ReactNode
}

export function TaskListLayout({ children }: TaskListLayoutProps) {
  return <ul aria-label="출시 체크 항목">{children}</ul>
}
