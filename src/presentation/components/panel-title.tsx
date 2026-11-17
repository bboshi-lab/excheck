import type { ReactNode } from "react"

import { CardDescription, CardTitle } from "../ui/card"

type PanelTitleProps = {
  eyebrow: string
  title: ReactNode
}

export function PanelTitle({ eyebrow, title }: PanelTitleProps) {
  return (
    <div>
      <CardDescription className="mb-2 text-[10px] tracking-widest">{eyebrow}</CardDescription>
      <CardTitle role="heading" aria-level={2} className="text-base">
        {title}
      </CardTitle>
    </div>
  )
}
