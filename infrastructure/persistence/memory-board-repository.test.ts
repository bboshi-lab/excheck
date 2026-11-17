import { describe, expect, it } from "vitest"
import { createDemoBoard } from "@core/fixtures/create-demo-board"
import { MemoryBoardRepository } from "@infrastructure/persistence/memory-board-repository"

describe("메모리 보드 저장소", () => {
  it("초기 입력 객체와 조회 결과를 저장 상태에서 분리한다", async () => {
    const input = createDemoBoard()
    const repository = new MemoryBoardRepository(input)

    input.tasks.length = 0

    const snapshot = await repository.read()

    snapshot.tasks.length = 0

    expect((await repository.read()).tasks).toHaveLength(6)
  })

  it("실패한 초안을 버리고 다음 변경을 처리한다", async () => {
    const repository = new MemoryBoardRepository(createDemoBoard())

    await expect(
      repository.update((board) => {
        board.tasks.length = 0

        throw new Error("초안 실패")
      }),
    ).rejects.toThrow("초안 실패")
    expect(await repository.read()).toEqual(createDemoBoard())

    await repository.update((board) => {
      board.tasks[0].done = false
    })

    expect((await repository.read()).tasks[0].done).toBe(false)
  })

  it("리셋도 큐를 따라 실행되어 이전 변경이 다음 테스트에 남지 않는다", async () => {
    const repository = new MemoryBoardRepository(createDemoBoard())
    const update = repository.update((board) => {
      board.tasks.length = 0
    })
    const reset = repository.reset(createDemoBoard())

    await Promise.all([update, reset])

    expect(await repository.read()).toEqual(createDemoBoard())
  })
})
