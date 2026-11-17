import type { ReactNode } from "react"
import { Card, CardContent } from "@ui/card"

type BoardErrorLayoutProps = {
  children: ReactNode
}

export function BoardErrorLayout({ children }: BoardErrorLayoutProps) {
  return (
    <Card className="border-white/7 bg-card/85">
      <CardContent className="flex min-h-80 flex-col items-center justify-center p-8 text-center" role="alert">
        {children}
      </CardContent>
    </Card>
  )
}
