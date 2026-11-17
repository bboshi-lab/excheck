import type { ReactNode } from "react"

type CategoryLegendKeysLayoutProps = {
  children: ReactNode
}

export function CategoryLegendKeysLayout({ children }: CategoryLegendKeysLayoutProps) {
  return <span className="flex items-center gap-3">{children}</span>
}
