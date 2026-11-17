import { test, expect } from "@playwright/test"

test("deployed bundle intercepts API, completes and adds checks", async ({ page }) => {
  await page.goto("./")
  await page.getByRole("button", { name: "Let’s get launch-ready" }).click()

  await expect(page.getByRole("heading", { name: /Launch checklist/ })).toBeVisible()

  await page.getByRole("button", { name: "Complete Rollback runbook" }).click()

  await expect(page.getByRole("button", { name: "Reopen Rollback runbook" })).toBeVisible()

  await page.getByRole("button", { name: "Add check" }).click()
  await page.getByLabel("Check title").fill("Browser verified check")
  await page.getByRole("button", { name: "Add check" }).last().click()

  await expect(page.getByRole("button", { name: "Complete Browser verified check" })).toBeVisible()

  await page.getByRole("link", { name: "Launch checks" }).click()
  await page.reload()

  await expect(page.getByRole("button", { name: "Complete Rollback runbook" })).toBeVisible()
  await expect(page.getByText("Browser verified check", { exact: true })).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
