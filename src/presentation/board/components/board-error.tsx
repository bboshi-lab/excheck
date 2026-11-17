import { CloudOff, RotateCcw } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"

type BoardErrorProps = {
  error: Error
  onRetry: () => void
}

export function BoardError({ error, onRetry }: BoardErrorProps) {
  return (
    <Card className="border-white/7 bg-card/85">
      <CardContent className="flex min-h-80 flex-col items-center justify-center p-8 text-center" role="alert">
        <span className="mb-5 rounded-2xl bg-destructive/10 p-4 text-destructive">
          <CloudOff className="size-7" />
        </span>
        <h2 className="text-lg font-semibold">보드를 불러오지 못했어요.</h2>
        <p className="mb-6 mt-3 max-w-md text-sm leading-7 text-muted-foreground">{error.message}</p>
        <Button onClick={onRetry}>
          <RotateCcw />
          다시 시도
        </Button>
      </CardContent>
    </Card>
  )
}
