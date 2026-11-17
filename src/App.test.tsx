import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter } from "react-router"
import { http, HttpResponse } from "msw"
import App from "./App"
import { server } from "./test/setup"

function mount() {
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
          },
        })
      }
    >
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe("launch workspace", () => {
  it("loads, completes a task, and records the activity", async () => {
    const user = userEvent.setup()

    mount()
    await user.click(await screen.findByRole("button", { name: "Complete Rollback runbook" }))
    await screen.findByRole("button", { name: "Reopen Rollback runbook" })

    expect(await screen.findByText("Completed “Rollback runbook”")).toBeVisible()
  })

  it("adds a validated check and filters by workstream", async () => {
    const user = userEvent.setup()

    mount()
    await user.click(await screen.findByRole("button", { name: "Add check" }))
    await user.type(screen.getByLabelText("Check title"), "Verify release notes")
    await user.selectOptions(screen.getByLabelText("Workstream"), "Operations")
    await user.click(screen.getAllByRole("button", { name: "Add check" })[1])
    await screen.findByRole("button", {
      name: "Complete Verify release notes",
    })
    await user.click(screen.getByRole("button", { name: "Design" }))

    expect(screen.queryByText("Verify release notes")).not.toBeInTheDocument()
    expect(screen.getByText("Responsive layout review")).toBeVisible()
  })

  it("recovers from a failed load on explicit retry", async () => {
    server.use(http.get("*/api/board", () => HttpResponse.json({ error: "Offline" }, { status: 503 })))

    const user = userEvent.setup()

    mount()

    expect(await screen.findByRole("alert")).toHaveTextContent("Offline")

    server.resetHandlers()
    await user.click(screen.getByRole("button", { name: "Try again" }))
    await screen.findByRole("button", { name: "Complete Rollback runbook" })
  })

  it("keeps the task unchanged when the server rejects a mutation", async () => {
    server.use(http.patch("*/api/tasks/:id", () => HttpResponse.json({ error: "Try later" }, { status: 503 })))

    const user = userEvent.setup()

    mount()
    await user.click(await screen.findByRole("button", { name: "Complete Rollback runbook" }))

    expect(await screen.findByRole("alert")).toHaveTextContent("Try later")

    await waitFor(() => expect(screen.getByRole("button", { name: "Complete Rollback runbook" })).toBeEnabled())
  })
})
