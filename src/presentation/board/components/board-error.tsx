import { BoardErrorLayout } from "./feedback/board-error-layout"
import { BoardErrorIcon } from "./feedback/board-error-icon"
import { BoardErrorTitle } from "./feedback/board-error-title"
import { BoardErrorMessage } from "./feedback/board-error-message"
import { BoardRetryButton } from "./feedback/board-retry-button"

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
