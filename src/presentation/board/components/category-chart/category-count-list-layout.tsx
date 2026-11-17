import type { ReactNode } from "react"

type CategoryCountListLayoutProps = {
  children: ReactNode
}

export function CategoryCountListLayout({ children }: CategoryCountListLayoutProps) {
  return (
    <ul aria-label="분야별 체크 집계" className="sr-only">
      {children}
    </ul>
  )
}
