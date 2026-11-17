import type { ReactNode, Ref } from "react"

type TaskItemLayoutProps = {
  children: ReactNode
  rowRef: Ref<HTMLLIElement>
  pending: boolean
}

export function TaskItemLayout({ children, rowRef, pending }: TaskItemLayoutProps) {
  return (
    <li
      ref={rowRef}
      className="border-b border-white/5 px-4 py-4 transition-colors last:border-0 hover:bg-white/2 sm:px-6"
      aria-busy={pending}
    >
      {children}
    </li>
  )
}
