import type { ReactNode } from "react"

type BoardLoadingLayoutProps = {
  children: ReactNode
}

export function BoardLoadingLayout({ children }: BoardLoadingLayoutProps) {
  return (
    <div role="status" aria-label="보드를 불러오는 중" className="space-y-5">
      {children}
    </div>
  )
}
