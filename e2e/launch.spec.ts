import { test, expect, type Page } from "@playwright/test"

async function openWorkspace(page: Page) {
  await page.goto("./")
  await expect(page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).toBeVisible()
}

async function navigateTo(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "메뉴 열기" })

  if (await menu.isVisible()) {
    await menu.click()
    await page.getByRole("dialog").getByRole("link", { name, exact: true }).click()
    await expect(page.getByRole("dialog")).toHaveCount(0)
    return
  }

  await page.getByRole("navigation", { name: "주 메뉴" }).getByRole("link", { name, exact: true }).click()
}

test("실제 MSW 데이터로 준비율과 차트를 갱신하고 새 체크를 추가한다", async ({ page }) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await openWorkspace(page)

  await expect(page.getByRole("img", { name: "출시 준비율 50%, 6개 중 3개 완료" })).toBeVisible()
  await expect(page.getByRole("img", { name: "분야별 완료·미완료 체크 수" }).locator("svg")).toBeVisible()
  await page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" }).click()

  await expect(page.getByRole("img", { name: "출시 준비율 67%, 6개 중 4개 완료" })).toBeVisible()
  await expect(page.getByRole("list", { name: "최근 활동" })).toContainText("완료: “롤백 절차 문서화”")

  await page.getByRole("button", { name: "체크 추가" }).click()
  const dialog = page.getByRole("dialog")
  await dialog.getByRole("textbox", { name: "체크 제목" }).fill("브라우저 릴리스 검증")
  await dialog.getByRole("combobox", { name: "분야" }).click()
  await page.getByRole("option", { name: "운영", exact: true }).click()
  await dialog.getByRole("button", { name: "추가하기" }).click()

  await expect(page.getByRole("checkbox", { name: "브라우저 릴리스 검증 완료 여부" })).toBeVisible()
  await expect(page.getByRole("img", { name: "출시 준비율 57%, 7개 중 4개 완료" })).toBeVisible()
  await expect(page.getByRole("tab", { name: "운영", exact: true })).toHaveAttribute("aria-selected", "true")
  expect(errors).toEqual([])
})

test("세 경로를 탐색하고 새로고침하면 데모 상태를 초기화한다", async ({ page }) => {
  await openWorkspace(page)
  await page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" }).click()
  await expect(page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).toBeChecked()

  await navigateTo(page, "출시 체크리스트")
  await expect(page).toHaveURL(/#\/checks$/)
  await page.getByRole("tab", { name: "디자인", exact: true }).click()

  await expect(page.getByRole("checkbox")).toHaveCount(2)
  await expect(page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).toHaveCount(0)

  await navigateTo(page, "활동 타임라인")
  await expect(page).toHaveURL(/#\/activity$/)
  await expect(page.getByRole("list", { name: "최근 활동" })).toContainText("완료: “롤백 절차 문서화”")

  await navigateTo(page, "대시보드")
  await page.reload()

  await expect(page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).not.toBeChecked()
  await expect(page.getByRole("img", { name: "출시 준비율 50%, 6개 중 3개 완료" })).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test("대화상자의 키보드 포커스·검증·취소를 제공한다", async ({ page }) => {
  await openWorkspace(page)
  const trigger = page.getByRole("button", { name: "체크 추가" })
  await trigger.click()
  const dialog = page.getByRole("dialog")
  const title = dialog.getByRole("textbox", { name: "체크 제목" })

  await expect(title).toBeFocused()
  await title.fill("   ")
  await dialog.getByRole("button", { name: "추가하기" }).click()

  await expect(dialog.getByRole("alert")).toContainText("3~100자")
  await expect(title).toBeFocused()
  await dialog.getByRole("button", { name: "닫기", exact: true }).focus()
  await page.keyboard.press("Tab")

  await expect(title).toBeFocused()
  await page.keyboard.press("Escape")

  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test("모션 축소 환경에서도 실제 지표와 화면이 보인다", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await openWorkspace(page)

  await expect(page.getByRole("img", { name: "출시 준비율 50%, 6개 중 3개 완료" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "다음 릴리스, 확신을 가지고." })).toBeVisible()
  await page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" }).click()

  await expect(page.getByRole("img", { name: "출시 준비율 67%, 6개 중 4개 완료" })).toContainText("67")
  await page.setViewportSize({ width: 320, height: 760 })

  await expect(page.getByRole("img", { name: "분야별 완료·미완료 체크 수" }).locator("svg")).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test("본문 바로가기와 키보드 필터가 접근 가능한 이름·연결을 유지한다", async ({ page }) => {
  await openWorkspace(page)
  await page.keyboard.press("Tab")

  await expect(page.getByRole("link", { name: "본문으로 건너뛰기" })).toBeFocused()
  await page.keyboard.press("Enter")

  await expect(page.getByRole("main")).toBeFocused()
  await expect(page).not.toHaveURL(/main-content/)
  await page.getByRole("tab", { name: "전체", exact: true }).focus()
  await page.keyboard.press("ArrowRight")

  await expect(page.getByRole("tab", { name: "개발", exact: true })).toHaveAttribute("aria-selected", "true")
  await expect(page.getByRole("tabpanel", { name: "개발", exact: true }).getByRole("checkbox")).toHaveCount(2)
  await expect(page.getByRole("checkbox", { name: "롤백 절차 문서화 완료 여부" })).toHaveCount(0)
})
