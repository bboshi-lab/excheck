import type { BoardRuntime } from "@core/application/ports/board-runtime"

export const systemBoardRuntime: BoardRuntime = {
  createId: () => crypto.randomUUID(),
  now: () => new Date().toISOString(),
}
