import { describe, expect, it, vi } from "vitest"
import { createDemoBoard } from "../../../core/fixtures/create-demo-board"
import { createBoardHttpClient } from "./board-http-client"

describe("보드 HTTP 클라이언트", () => {
  it("Pages 경로에서 보드를 읽고 응답을 검증한다", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(createDemoBoard()))
    const client = createBoardHttpClient("/excheck/api", fetcher)

    expect(await client.getBoard()).toEqual(createDemoBoard())
    expect(fetcher.mock.calls[0][0]).toBe("/excheck/api/board")
  })

  it("생성·변경 본문과 URL 인코딩을 보존한다", async () => {
    const task = createDemoBoard().tasks[0]
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => Response.json(task))
    const client = createBoardHttpClient("/api/", fetcher)

    await client.createTask({ title: "Release notes", category: "Design" })
    await client.setTaskDone("folder/check 1", true)

    expect(fetcher.mock.calls[0][0]).toBe("/api/tasks")
    expect(fetcher.mock.calls[0][1]).toMatchObject({
      method: "POST",
      body: '{"title":"Release notes","category":"Design"}',
    })
    expect(fetcher.mock.calls[1][0]).toBe("/api/tasks/folder%2Fcheck%201")
    expect(fetcher.mock.calls[1][1]).toMatchObject({
      method: "PATCH",
      body: '{"done":true}',
    })
  })

  it("서버의 올바른 오류 문구를 전달한다", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ error: "Offline" }, { status: 503 }))

    await expect(createBoardHttpClient("/api", fetcher).getBoard()).rejects.toThrow("Offline")
  })

  it.each([
    { tasks: [], activity: "broken" },
    {
      tasks: [{ id: "1", title: "Check", done: false, category: "Other" }],
      activity: [],
    },
    null,
  ])("200이어도 잘못된 응답을 UI에 넘기지 않는다: %j", async (body) => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(body))

    await expect(createBoardHttpClient("/api", fetcher).getBoard()).rejects.toThrow("invalid response")
  })

  it("HTML 오류 응답을 파싱 오류 대신 연결 오류로 처리한다", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response("<h1>Unavailable</h1>", { status: 502 }))

    await expect(createBoardHttpClient("/api", fetcher).getBoard()).rejects.toThrow("Unable to reach")
  })

  it("JSON이 아닌 성공 응답도 거절한다", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response("not JSON"))

    await expect(createBoardHttpClient("/api", fetcher).getBoard()).rejects.toThrow("invalid response")
  })

  it("네트워크 실패를 사용자에게 전달할 오류로 변환한다", async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("fetch failed"))

    await expect(createBoardHttpClient("/api", fetcher).getBoard()).rejects.toThrow("Unable to reach")
  })
})
