import { BoardErrorIcon } from "@presentation/board/components/feedback/board-error-icon"
import { BoardErrorLayout } from "@presentation/board/components/feedback/board-error-layout"
import { BoardErrorMessage } from "@presentation/board/components/feedback/board-error-message"
import { BoardErrorTitle } from "@presentation/board/components/feedback/board-error-title"
import { BoardRetryButton } from "@presentation/board/components/feedback/board-retry-button"

type BoardErrorProps = {
  error: Error
  onRetry: () => void
}

export function BoardError({ error, onRetry }: BoardErrorProps) {
  return (
    <BoardErrorLayout>
      <BoardErrorIcon />
      <BoardErrorTitle />
      <BoardErrorMessage message={error.message} />
      <BoardRetryButton onRetry={onRetry} />
    </BoardErrorLayout>
  )
}
