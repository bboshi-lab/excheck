import { setupServer } from "msw/node"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { BoardService } from "@core/application/board-service"
import { boardSchema } from "@core/contracts/board-contract"
import { taskSchema } from "@core/contracts/task-contract"
import type { Board } from "@core/domain/board"
import { createDemoBoard } from "@core/fixtures/create-demo-board"
import { createBoardApi } from "@infrastructure/http/create-board-api"
import { createMockBoardApi } from "@infrastructure/http/create-mock-board-api"
import { systemBoardRuntime } from "@infrastructure/runtime/system-board-runtime"
import { createWorkerApp } from "@worker/create-worker-app"
import { DurableBoardRepository } from "@worker/infrastructure/durable-board-repository"

type ApiHarness = {
  request(path: string, init?: RequestInit): Promise<Response>
  dispose(): void
}

function createMockHarness(basePath: string): ApiHarness {
  const origin = "https://launchboard.test"
  const mock = createMockBoardApi({ origin, basePath, readDelay: 0 })
  const server = setupServer(...mock.handlers)

  server.listen({ onUnhandledFrame: "error" })

  return {
    request: (path, init) => fetch(`${origin}${basePath}${path}`, init),
    dispose: () => server.close(),
  }
}

function createWorkerHarness(): ApiHarness {
  let stored: Board | undefined
  const repository = new DurableBoardRepository(
    {
      read: () => Promise.resolve(stored),
      write: async (board) => {
        await Promise.resolve()

        stored = structuredClone(board)
      },
    },
    createDemoBoard,
  )
  const api = createBoardApi(new BoardService(repository, systemBoardRuntime))
  const worker = createWorkerApp((request) => api.fetch(request))

  return {
    request: async (path, init) => worker.request(`/api${path}`, init),
    dispose: () => undefined,
  }
}

const implementations = [
  { name: "MSW 루트 경로", create: () => createMockHarness("/api") },
  {
    name: "MSW Pages 하위 경로",
    create: () => createMockHarness("/excheck/api"),
  },
  { name: "Worker HTTP와 저장소 어댑터", create: createWorkerHarness },
]

for (const implementation of implementations) {
  describe(implementation.name, () => {
    let api: ApiHarness

    beforeEach(() => {
      api = implementation.create()
    })

    afterEach(() => api.dispose())

    const createTask = (body: unknown) =>
      api.request("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

    const readBoard = async () => boardSchema.parse(await (await api.request("/board")).json())

    it("상태 확인·초기 보드·알 수 없는 경로의 계약을 유지한다", async () => {
      expect(await (await api.request("/health")).json()).toEqual({
        status: "ok",
      })
      expect(await readBoard()).toEqual(createDemoBoard())

      const missing = await api.request("/missing")

      expect(missing.status).toBe(404)
      expect(await missing.json()).toEqual({ error: "요청한 경로를 찾을 수 없습니다." })
    })

    it("생성은 201과 정규화된 항목을 반환하고 활동에 반영한다", async () => {
      const response = await createTask({
        title: "  Release notes  ",
        category: "Operations",
      })
      const task = taskSchema.parse(await response.json())
      const board = await readBoard()

      expect(response.status).toBe(201)
      expect(task).toMatchObject({
        title: "Release notes",
        category: "Operations",
        done: false,
      })
      expect(board.tasks).toHaveLength(7)
      expect(board.tasks.at(-1)).toEqual(task)
      expect(board.activity[0].message).toBe("추가: “Release notes”")
    })

    it("완료·재개의 결과와 활동을 반환한다", async () => {
      for (const done of [true, false]) {
        const response = await api.request("/tasks/6", {
          method: "PATCH",
          body: JSON.stringify({ done }),
        })

        expect(response.status).toBe(200)
        expect(taskSchema.parse(await response.json())).toMatchObject({
          id: "6",
          done,
        })
      }

      const board = await readBoard()

      expect(board.activity).toHaveLength(3)
      expect(board.activity[0].message).toBe("재개: “롤백 절차 문서화”")
    })

    it.each([
      { title: "   ", category: "Design" },
      { title: "ab", category: "Design" },
      { title: "x".repeat(101), category: "Design" },
      { title: "Release notes", category: "Unknown" },
      null,
    ])("잘못된 생성 입력은 400이고 상태를 변경하지 않는다: %j", async (body) => {
      const response = await createTask(body)

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({
        error: "제목은 양끝 공백을 제외한 3~100자로 입력하고 올바른 분야를 선택해 주세요.",
      })
      expect(await readBoard()).toEqual(createDemoBoard())
    })

    it("깨진 JSON과 잘못된 완료 입력을 거절한다", async () => {
      for (const [path, method, body] of [
        ["/tasks", "POST", "{"],
        ["/tasks/6", "PATCH", "{"],
        ["/tasks/6", "PATCH", '{"done":"true"}'],
      ]) {
        const response = await api.request(path, { method, body })

        expect(response.status).toBe(400)
      }

      expect(await readBoard()).toEqual(createDemoBoard())
    })

    it("없는 항목은 404이고 다음 정상 요청에는 영향을 주지 않는다", async () => {
      const response = await api.request("/tasks/missing", {
        method: "PATCH",
        body: '{"done":true}',
      })

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual({ error: "체크 항목을 찾을 수 없습니다." })
      expect(await readBoard()).toEqual(createDemoBoard())
      expect((await createTask({ title: "Recovery check", category: "Design" })).status).toBe(201)
    })

    it("동시에 도착한 생성 요청을 잃지 않는다", async () => {
      const results = await Promise.all(
        Array.from({ length: 12 }, (_, index) => createTask({ title: `Concurrent ${index}`, category: "Engineering" })),
      )
      const board = await readBoard()

      expect(results.every((response) => response.status === 201)).toBe(true)
      expect(board.tasks).toHaveLength(18)
      expect(new Set(board.tasks.map((task) => task.id)).size).toBe(18)
      expect(board.activity).toHaveLength(13)
    })
  })
}
