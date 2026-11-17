import type { ReactNode } from "react"

type WorkspaceContentProps = {
  children: ReactNode
}

export function WorkspaceContent({ children }: WorkspaceContentProps) {
  return <div className="lg:pl-60 xl:pl-64">{children}</div>
}
