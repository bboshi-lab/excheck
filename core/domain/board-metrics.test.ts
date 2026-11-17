import { describe, expect, it } from "vitest"
import { summarizeCategories } from "@core/domain/board-metrics"
import { createDemoBoard } from "@core/fixtures/create-demo-board"

describe("분야별 준비 현황", () => {
  it("실제 분야별 완료·미완료 수를 집계한다", () => {
    expect(summarizeCategories(createDemoBoard().tasks)).toEqual([
      { category: "Engineering", complete: 2, remaining: 0, total: 2, percent: 100 },
      { category: "Design", complete: 1, remaining: 1, total: 2, percent: 50 },
      { category: "Operations", complete: 0, remaining: 2, total: 2, percent: 0 },
    ])
  })

  it("항목이 없는 분야도 0으로 표시한다", () => {
    const summary = summarizeCategories([])

    expect(summary).toHaveLength(3)
    expect(summary.every((category) => category.total === 0 && category.percent === 0)).toBe(true)
  })
})
