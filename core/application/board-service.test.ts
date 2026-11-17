import { beforeEach, describe, expect, it } from "vitest"
import { MemoryBoardRepository } from "../../infrastructure/persistence/memory-board-repository"
import { ACTIVITY_LIMIT } from "../domain/board"
import { createDemoBoard } from "../fixtures/create-demo-board"
import { BoardService } from "./board-service"
import type { BoardRuntime } from "./ports/board-runtime"
import { TaskNotFoundError } from "./task-not-found-error"

describe("보드 응용 서비스", () => {
  let board: BoardService
  let nextId: number
  const now = "2026-11-17T10:00:00.000Z"

  beforeEach(() => {
    nextId = 0

    const runtime: BoardRuntime = {
      createId: () => `generated-${++nextId}`,
      now: () => now,
    }

    board = new BoardService(new MemoryBoardRepository(createDemoBoard()), runtime)
  })

  it("생성과 활동 기록을 하나의 변경으로 저장한다", async () => {
    const task = await board.createTask({
      title: "Release notes",
      category: "Operations",
    })
    const snapshot = await board.getBoard()

    expect(task).toEqual({
      id: "generated-1",
      title: "Release notes",
      category: "Operations",
      done: false,
    })
    expect(snapshot.tasks).toHaveLength(7)
    expect(snapshot.activity[0]).toEqual({
      id: "generated-2",
      message: "추가: “Release notes”",
      at: now,
    })
  })

  it("완료와 재개를 각각 기록한다", async () => {
    expect(await board.setTaskDone("6", true)).toMatchObject({ done: true })
    expect(await board.setTaskDone("6", false)).toMatchObject({ done: false })

    const snapshot = await board.getBoard()

    expect(snapshot.activity.slice(0, 2).map((event) => event.message)).toEqual([
      "재개: “롤백 절차 문서화”",
      "완료: “롤백 절차 문서화”",
    ])
  })

  it("없는 항목은 실패하고 보드와 활동을 변경하지 않는다", async () => {
    const before = await board.getBoard()

    await expect(board.setTaskDone("missing", true)).rejects.toBeInstanceOf(TaskNotFoundError)
    expect(await board.getBoard()).toEqual(before)
    await expect(board.setTaskDone("6", true)).resolves.toMatchObject({
      done: true,
    })
  })

  it("활동은 최신 20개만 남긴다", async () => {
    for (let index = 0; index < ACTIVITY_LIMIT + 5; index += 1) {
      await board.createTask({ title: `Check ${index}`, category: "Design" })
    }

    const snapshot = await board.getBoard()

    expect(snapshot.activity).toHaveLength(ACTIVITY_LIMIT)
    expect(snapshot.activity[0].message).toBe("추가: “Check 24”")
  })

  it("반환값을 수정해도 저장된 보드가 바뀌지 않는다", async () => {
    const created = await board.createTask({
      title: "Release notes",
      category: "Design",
    })
    const snapshot = await board.getBoard()

    created.title = "Outside mutation"
    snapshot.tasks.length = 0

    const stored = await board.getBoard()

    expect(stored.tasks).toHaveLength(7)
    expect(stored.tasks.at(-1)?.title).toBe("Release notes")
  })
})
