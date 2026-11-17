import type { ReactNode } from "react"
import { PanelTitle } from "@presentation/components/panel-title"
import { CardHeader } from "@ui/card"

type PanelHeadingProps = {
  eyebrow: string
  title: ReactNode
  action?: ReactNode
  className?: string
}

export function PanelHeading({ eyebrow, title, action, className }: PanelHeadingProps) {
  return (
    <CardHeader className={`flex flex-row items-start justify-between gap-3 ${className ?? ""}`}>
      <PanelTitle eyebrow={eyebrow} title={title} />
      {action}
    </CardHeader>
  )
}
