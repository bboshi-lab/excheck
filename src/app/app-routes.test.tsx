import { QueryClient } from "@tanstack/react-query"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse, delay } from "msw"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"

import { AppProviders } from "@app/app-providers"
import { AppRoutes } from "@app/app-routes"
import { createBoardHttpClient } from "@client/http/board-http-client"
import { createDemoBoard } from "@core/fixtures/create-demo-board"
import { server } from "@test/setup"

function renderWorkspace(path = "/") {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const gateway = createBoardHttpClient(`${import.meta.env.BASE_URL}api/`)

  return render(
    <AppProviders gateway={gateway} queryClient={client}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe("출시 워크스페이스", () => {
  it("보드를 읽고 실제 체크 데이터로 지표를 표시한다", async () => {
    renderWorkspace()

    expect(await screen.findByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).not.toBeChecked()
    expect(screen.getByRole("img", { name: "출시 준비율 50%, 6개 중 3개 완료" })).toBeVisible()
    expect(screen.getByLabelText("완료한 체크 3개")).toBeVisible()
    const categorySummary = screen.getByRole("list", { name: "분야별 체크 집계" })

    expect(within(categorySummary).getAllByRole("listitem")).toHaveLength(3)
    expect(categorySummary).toHaveTextContent("개발: 완료 2개, 미완료 0개, 전체 2개")
    expect(categorySummary).toHaveTextContent("디자인: 완료 1개, 미완료 1개, 전체 2개")
    expect(categorySummary).toHaveTextContent("운영: 완료 0개, 미완료 2개, 전체 2개")
    expect(
      document.querySelectorAll("table, thead, tbody, tfoot, tr, th, td, caption, col, colgroup, br"),
    ).toHaveLength(0)
  })

  it("완료·재개 후 지표와 활동을 갱신한다", async () => {
    const user = userEvent.setup()
    renderWorkspace()

    const checkbox = await screen.findByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })
    await user.click(checkbox)

    await waitFor(() => expect(checkbox).toBeChecked())
    expect(await screen.findByText("완료: “롤백 절차 문서화”")).toBeVisible()
    expect(screen.getByRole("img", { name: "출시 준비율 67%, 6개 중 4개 완료" })).toBeVisible()
    expect(screen.getByRole("list", { name: "분야별 체크 집계" })).toHaveTextContent(
      "운영: 완료 1개, 미완료 1개, 전체 2개",
    )

    await user.click(checkbox)

    await waitFor(() => expect(checkbox).not.toBeChecked())
    expect(await screen.findByText("재개: “롤백 절차 문서화”")).toBeVisible()
  })

  it("분야 필터는 해당 항목만 보여준다", async () => {
    const user = userEvent.setup()
    renderWorkspace()
    await screen.findByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })

    await user.click(screen.getByRole("tab", { name: "디자인" }))

    expect(screen.getByRole("checkbox", { name: "반응형 화면 검토 완료 여부" })).toBeVisible()
    expect(screen.queryByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).not.toBeInTheDocument()
  })

  it("공백 제목을 거절하고 정규화된 항목을 추가한다", async () => {
    const user = userEvent.setup()
    renderWorkspace()
    await user.click(await screen.findByRole("button", { name: "체크 추가" }))
    const dialog = screen.getByRole("dialog")
    const title = within(dialog).getByRole("textbox", { name: "체크 제목" })

    expect(dialog.querySelector("br")).toBeNull()
    await user.type(title, "   ")
    await user.click(within(dialog).getByRole("button", { name: "추가하기" }))

    expect(await within(dialog).findByRole("alert")).toHaveTextContent("3~100자")
    expect(title).toHaveFocus()

    await user.clear(title)
    await user.type(title, "  릴리스 노트 검토  ")
    await user.click(within(dialog).getByRole("combobox", { name: "분야" }))
    await user.click(await screen.findByRole("option", { name: "운영" }))
    await user.click(within(dialog).getByRole("button", { name: "추가하기" }))

    expect(await screen.findByRole("checkbox", { name: "릴리스 노트 검토 완료 여부" })).toBeVisible()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "운영" })).toHaveAttribute("data-state", "active")
  })

  it("생성 실패 시 입력을 보존하고 재시도할 수 있다", async () => {
    server.use(
      http.post("*/api/tasks", () => HttpResponse.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 503 })),
    )
    const user = userEvent.setup()
    renderWorkspace()
    await user.click(await screen.findByRole("button", { name: "체크 추가" }))
    const dialog = screen.getByRole("dialog")
    const title = within(dialog).getByRole("textbox", { name: "체크 제목" })

    await user.type(title, "실패 후 다시 저장")
    await user.click(within(dialog).getByRole("button", { name: "추가하기" }))

    expect(await within(dialog).findByRole("alert")).toHaveTextContent("잠시 후")
    expect(title).toHaveValue("실패 후 다시 저장")

    server.resetHandlers()
    await user.click(within(dialog).getByRole("button", { name: "추가하기" }))

    expect(await screen.findByRole("checkbox", { name: "실패 후 다시 저장 완료 여부" })).toBeVisible()
  })

  it("저장 중 중복 제출을 차단한다", async () => {
    let requests = 0
    server.use(
      http.post("*/api/tasks", async () => {
        requests += 1
        await delay(200)
        return HttpResponse.json(
          { ...createDemoBoard().tasks[0], id: "new-task", title: "중복 방지 체크" },
          { status: 201 },
        )
      }),
    )
    const user = userEvent.setup()
    renderWorkspace()
    await user.click(await screen.findByRole("button", { name: "체크 추가" }))
    const dialog = screen.getByRole("dialog")

    await user.type(within(dialog).getByRole("textbox", { name: "체크 제목" }), "중복 방지 체크")
    await user.click(within(dialog).getByRole("button", { name: "추가하기" }))

    expect(within(dialog).getByRole("button", { name: "저장 중…" })).toBeDisabled()
    expect(within(dialog).getByRole("button", { name: "취소" })).toBeDisabled()
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    expect(requests).toBe(1)
  })

  it("완료 저장 실패 시 기존 체크 상태를 유지한다", async () => {
    server.use(
      http.patch("*/api/tasks/:id", () => HttpResponse.json({ error: "저장하지 못했습니다." }, { status: 503 })),
    )
    const user = userEvent.setup()
    renderWorkspace()
    const checkbox = await screen.findByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })

    await user.click(checkbox)

    expect(await screen.findByRole("alert")).toHaveTextContent("저장하지 못했습니다.")
    expect(checkbox).not.toBeChecked()
    await waitFor(() => expect(checkbox).toBeEnabled())
  })

  it("초기 조회 실패에서 명시적 재시도로 복구한다", async () => {
    server.use(http.get("*/api/board", () => HttpResponse.json({ error: "연결을 확인해 주세요." }, { status: 503 })))
    const user = userEvent.setup()
    renderWorkspace()
    expect(await screen.findByRole("alert")).toHaveTextContent("연결을 확인해 주세요.")

    server.resetHandlers()
    await user.click(screen.getByRole("button", { name: "다시 시도" }))

    expect(await screen.findByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).toBeVisible()
  })

  it("빈 보드의 준비율을 100%로 표시하지 않는다", async () => {
    server.use(http.get("*/api/board", () => HttpResponse.json({ tasks: [], activity: [] })))
    renderWorkspace()

    expect(await screen.findByRole("heading", { name: "아직 등록된 체크가 없어요." })).toBeVisible()
    expect(screen.getByRole("img", { name: "출시 준비율 0%, 0개 중 0개 완료" })).toBeVisible()
  })

  it("잘못된 경로에서 대시보드로 돌아갈 수 있다", async () => {
    const user = userEvent.setup()
    renderWorkspace("/unknown")

    expect(screen.getByRole("heading", { name: "잠시 궤도를 벗어났네요." })).toBeVisible()
    await user.click(screen.getByRole("link", { name: "대시보드로 돌아가기" }))

    expect(await screen.findByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).toBeVisible()
  })
})
