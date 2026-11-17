import type { ReactNode, FormEventHandler } from "react"

type TaskFormLayoutProps = {
  children: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function TaskFormLayout({ children, onSubmit }: TaskFormLayoutProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 pt-2">
      {children}
    </form>
  )
}
