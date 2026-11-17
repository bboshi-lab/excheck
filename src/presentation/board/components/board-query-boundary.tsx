import type { UseQueryResult } from "@tanstack/react-query"
import type { ReactNode } from "react"

import type { Board } from "@core/domain/board"
import { BoardError } from "@presentation/board/components/board-error"
import { BoardSkeleton } from "@presentation/board/components/board-skeleton"

type BoardQueryBoundaryProps = {
  query: UseQueryResult<Board, Error>
  children: ReactNode
}

export function BoardQueryBoundary({ query, children }: BoardQueryBoundaryProps) {
  const handleRetry = () => {
    void query.refetch()
  }

  if (query.isPending) return <BoardSkeleton />
  if (query.isError) return <BoardError error={query.error} onRetry={handleRetry} />

  return children
}
