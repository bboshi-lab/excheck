import { describe, expect, it } from "vitest"
import { createWorkerApp } from "./create-worker-app"

// 실제 Cloudflare 바인딩은 로컬 workerd 검사에서 확인한다.
describe("Worker 요청 라우팅", () => {
  it("상태 확인은 저장소를 호출하지 않는다", async () => {
    const app = createWorkerApp(() => {
      throw new Error("보드에 접근하면 안 됩니다.")
    })

    expect(await (await app.request("/api/health")).json()).toEqual({
      status: "ok",
    })
    expect((await app.request("/unknown")).status).toBe(404)
  })

  it("요청 본문과 경로를 변경 없이 보드로 전달한다", async () => {
    const app = createWorkerApp(async (request) => {
      expect(request.method).toBe("PATCH")
      expect(new URL(request.url).pathname).toBe("/api/tasks/check-1")
      expect(await request.json()).toEqual({ done: true })

      return Response.json({ forwarded: true })
    })

    const response = await app.request("/api/tasks/check-1", {
      method: "PATCH",
      body: JSON.stringify({ done: true }),
    })

    expect(await response.json()).toEqual({ forwarded: true })
  })
})
