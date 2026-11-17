import type { ReactNode } from "react"
import { Card } from "../../../ui/card"

type CategoryChartCardProps = {
  children: ReactNode
}

export function CategoryChartCard({ children }: CategoryChartCardProps) {
  return (
    <Card className="min-w-0 gap-3 border-white/7 bg-card/85" data-entrance>
      {children}
    </Card>
  )
}
