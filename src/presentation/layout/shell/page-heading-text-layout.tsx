import type { ReactNode } from "react"

type PageHeadingTextLayoutProps = {
  children: ReactNode
}

export function PageHeadingTextLayout({ children }: PageHeadingTextLayoutProps) {
  return <div>{children}</div>
}
