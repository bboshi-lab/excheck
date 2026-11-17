import type { ReactNode } from "react"

type PageHeadingLayoutProps = {
  children: ReactNode
}

export function PageHeadingLayout({ children }: PageHeadingLayoutProps) {
  return <div className="mb-7 flex items-end justify-between gap-4">{children}</div>
}
