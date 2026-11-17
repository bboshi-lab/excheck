import { describe, expect, it } from "vitest"
import { createDemoBoard } from "../fixtures/create-demo-board"
import { calculateReadiness } from "./readiness"

describe("출시 준비율", () => {
  it("항목이 없으면 준비 완료로 표시하지 않는다", () => {
    expect(calculateReadiness([])).toEqual({
      complete: 0,
      total: 0,
      percent: 0,
    })
  })

  it("실제 완료 항목의 비율을 반올림한다", () => {
    const tasks = createDemoBoard().tasks.slice(0, 3)

    expect(calculateReadiness(tasks)).toEqual({
      complete: 2,
      total: 3,
      percent: 67,
    })
  })

  it("모든 항목이 완료되었을 때만 100%를 반환한다", () => {
    const tasks = createDemoBoard().tasks.map((task) => ({
      ...task,
      done: true,
    }))

    expect(calculateReadiness(tasks).percent).toBe(100)
  })
})
