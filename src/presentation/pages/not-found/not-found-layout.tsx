import type { ReactNode } from "react"

type NotFoundLayoutProps = {
  children: ReactNode
}

export function NotFoundLayout({ children }: NotFoundLayoutProps) {
  return <section className="flex min-h-96 flex-col items-center justify-center gap-5 text-center">{children}</section>
}
