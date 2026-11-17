import { describe, expect, it } from "vitest"
import { createTaskSchema, setTaskDoneSchema } from "@core/contracts/task-contract"

describe("항목 입력 계약", () => {
  it("제목의 양끝 공백을 제거한다", () => {
    expect(
      createTaskSchema.parse({
        title: "  Release notes  ",
        category: "Design",
      }),
    ).toEqual({ title: "Release notes", category: "Design" })
  })

  it.each([
    { title: "   ", category: "Design" },
    { title: "ab", category: "Design" },
    { title: "x".repeat(101), category: "Design" },
    { title: "Release notes", category: "Other" },
    { title: "Release notes" },
    null,
  ])("잘못된 생성 입력을 거절한다: %j", (input) => {
    expect(createTaskSchema.safeParse(input).success).toBe(false)
  })

  it.each([3, 100])("제목 길이 경계값 %i를 허용한다", (length) => {
    expect(
      createTaskSchema.safeParse({
        title: "x".repeat(length),
        category: "Engineering",
      }).success,
    ).toBe(true)
  })

  it.each([{}, { done: "true" }, { done: null }])("완료 여부에는 boolean만 허용한다: %j", (input) => {
    expect(setTaskDoneSchema.safeParse(input).success).toBe(false)
  })
})
