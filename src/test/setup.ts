import "@testing-library/jest-dom/vitest"
import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from "msw/node"
import { useFilters } from "../store"
import { cleanup } from "@testing-library/react"
import { handlers, resetMockBoard } from "../mocks/handlers"

export const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledFrame: "error" }))

afterEach(async () => {
  cleanup()
  useFilters.setState({ category: "All" })
  server.resetHandlers()
  await resetMockBoard()
})

afterAll(() => server.close())
