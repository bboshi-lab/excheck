import { BoardService } from "@core/application/board-service"
import type { Board } from "@core/domain/board"
import { createDemoBoard } from "@core/fixtures/create-demo-board"
import { createBoardApi } from "@infrastructure/http/create-board-api"
import { systemBoardRuntime } from "@infrastructure/runtime/system-board-runtime"
import { createWorkerApp } from "@worker/create-worker-app"
import { DurableBoardRepository } from "@worker/infrastructure/durable-board-repository"

type Bindings = { BOARD: DurableObjectNamespace }

export class ReleaseBoard {
  private readonly api: ReturnType<typeof createBoardApi>

  constructor(state: DurableObjectState) {
    const repository = new DurableBoardRepository(
      {
        read: () => state.storage.get<Board>("board"),
        write: (board) => state.storage.put("board", board),
      },
      createDemoBoard,
    )

    this.api = createBoardApi(new BoardService(repository, systemBoardRuntime))
  }

  fetch(request: Request) {
    return this.api.fetch(request)
  }
}

export default {
  fetch(request, environment) {
    const worker = createWorkerApp((boardRequest) =>
      environment.BOARD.get(environment.BOARD.idFromName("demo")).fetch(boardRequest),
    )

    return worker.fetch(request)
  },
} satisfies ExportedHandler<Bindings>
