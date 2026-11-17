import type { ReactNode } from "react"

type TaskFormActionsLayoutProps = {
  children: ReactNode
}

export function TaskFormActionsLayout({ children }: TaskFormActionsLayoutProps) {
  return <div className="flex justify-end gap-2 border-t border-white/8 pt-5">{children}</div>
}
