import type { ZodType } from "zod"
import type { BoardGateway } from "@core/application/ports/board-gateway"
import { apiErrorSchema, boardSchema } from "@core/contracts/board-contract"
import { taskSchema } from "@core/contracts/task-contract"

const CONNECTION_ERROR = "워크스페이스에 연결하지 못했습니다. 다시 시도해 주세요."
const INVALID_RESPONSE_ERROR = "워크스페이스의 응답을 확인할 수 없습니다. 다시 시도해 주세요."

export function createBoardHttpClient(
  baseUrl: string,
  fetcher: typeof fetch = (input, init) => globalThis.fetch(input, init),
): BoardGateway {
  const apiRoot = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`

  const request = async <Result>(path: string, schema: ZodType<Result>, init?: RequestInit): Promise<Result> => {
    const response = await fetcher(`${apiRoot}${path}`, {
      ...init,
      headers: { ...init?.headers, "Content-Type": "application/json" },
    }).catch(() => {
      throw new Error(CONNECTION_ERROR)
    })
    const body: unknown = await response.json().catch(() => null)

    if (!response.ok) {
      const error = apiErrorSchema.safeParse(body)

      throw new Error(error.success ? error.data.error : CONNECTION_ERROR)
    }

    const result = schema.safeParse(body)

    if (!result.success) {
      throw new Error(INVALID_RESPONSE_ERROR)
    }

    return result.data
  }

  return {
    getBoard: () => request("board", boardSchema),
    createTask: (input) =>
      request("tasks", taskSchema, {
        method: "POST",
        body: JSON.stringify(input),
      }),
    setTaskDone: (id, done) =>
      request(`tasks/${encodeURIComponent(id)}`, taskSchema, {
        method: "PATCH",
        body: JSON.stringify({ done }),
      }),
  }
}
