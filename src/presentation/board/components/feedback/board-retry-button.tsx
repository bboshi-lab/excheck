import { RotateCcw } from "lucide-react"

import { Button } from "../../../ui/button"

type BoardRetryButtonProps = {
  onRetry: () => void
}

export function BoardRetryButton({ onRetry }: BoardRetryButtonProps) {
  return (
    <Button onClick={onRetry}>
      <RotateCcw />
      다시 시도
    </Button>
  )
}
