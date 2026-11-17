import type { BoardRepository } from "@core/application/ports/board-repository"
import type { Board } from "@core/domain/board"
import { SerialOperationQueue } from "@infrastructure/persistence/serial-operation-queue"

export class MemoryBoardRepository implements BoardRepository {
  private board: Board
  private readonly queue = new SerialOperationQueue()

  constructor(initialBoard: Board) {
    this.board = structuredClone(initialBoard)
  }

  read(): Promise<Board> {
    return this.queue.run(() => structuredClone(this.board))
  }

  update<Result>(change: (draft: Board) => Result): Promise<Result> {
    return this.queue.run(() => {
      const draft = structuredClone(this.board)
      const result = change(draft)
      const detachedResult = structuredClone(result)

      this.board = draft

      return detachedResult
    })
  }

  reset(board: Board): Promise<void> {
    return this.queue.run(() => {
      this.board = structuredClone(board)
    })
  }
}
