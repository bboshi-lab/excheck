import { delay, http } from "msw"
import { BoardService } from "@core/application/board-service"
import { createDemoBoard } from "@core/fixtures/create-demo-board"
import { createBoardApi } from "@infrastructure/http/create-board-api"
import { MemoryBoardRepository } from "@infrastructure/persistence/memory-board-repository"
import { systemBoardRuntime } from "@infrastructure/runtime/system-board-runtime"

type MockApiOptions = {
  origin: string
  basePath?: string
  readDelay?: number
}

export function createMockBoardApi({ origin, basePath = "/api", readDelay = 100 }: MockApiOptions) {
  const repository = new MemoryBoardRepository(createDemoBoard())
  const service = new BoardService(repository, systemBoardRuntime)
  const api = createBoardApi(service, basePath)

  return {
    handlers: [
      http.all(`${origin}${basePath}/*`, async ({ request }) => {
        if (request.method === "GET" && new URL(request.url).pathname === `${basePath}/board`) {
          await delay(readDelay)
        }

        return api.fetch(request)
      }),
    ],
    reset: () => repository.reset(createDemoBoard()),
  }
}
