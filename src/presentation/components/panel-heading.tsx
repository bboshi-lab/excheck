import type { ReactNode } from "react"

import { CardHeader } from "../ui/card"

import { PanelTitle } from "./panel-title"

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
