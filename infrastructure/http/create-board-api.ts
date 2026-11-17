import { Hono } from "hono"
import type { BoardGateway } from "../../core/application/ports/board-gateway"
import { TaskNotFoundError } from "../../core/application/task-not-found-error"
import { createTaskSchema, setTaskDoneSchema } from "../../core/contracts/task-contract"

export function createBoardApi(board: BoardGateway, basePath = "/api") {
  const app = new Hono().basePath(basePath)

  app.get("/health", (context) => context.json({ status: "ok" }))
  app.get("/board", async (context) => context.json(await board.getBoard()))

  app.post("/tasks", async (context) => {
    const body: unknown = await context.req.json().catch(() => null)
    const input = createTaskSchema.safeParse(body)

    if (!input.success) {
      return context.json({ error: "제목은 양끝 공백을 제외한 3~100자로 입력하고 올바른 분야를 선택해 주세요." }, 400)
    }

    return context.json(await board.createTask(input.data), 201)
  })

  app.patch("/tasks/:id", async (context) => {
    const body: unknown = await context.req.json().catch(() => null)
    const input = setTaskDoneSchema.safeParse(body)

    if (!input.success) {
      return context.json({ error: "완료 여부는 true 또는 false여야 합니다." }, 400)
    }

    return context.json(await board.setTaskDone(context.req.param("id"), input.data.done))
  })

  app.notFound((context) => context.json({ error: "요청한 경로를 찾을 수 없습니다." }, 404))
  app.onError((error, context) => {
    if (error instanceof TaskNotFoundError) {
      return context.json({ error: error.message }, 404)
    }

    return context.json({ error: "워크스페이스를 저장하지 못했습니다. 다시 시도해 주세요." }, 500)
  })

  return app
}
