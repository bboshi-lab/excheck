import "@testing-library/jest-dom/vitest"
import { afterAll, afterEach, beforeAll, vi } from "vitest"
import { setupServer } from "msw/node"
import { cleanup } from "@testing-library/react"
import { useBoardFilter } from "../presentation/board/state/filter-store"
import { handlers, resetMockBoard } from "../mocks/handlers"

export const server = setupServer(...handlers)

// jsdom에 없는 브라우저 API만 보완하고 실제 사용자 흐름은 mock하지 않는다.
vi.stubGlobal(
  "matchMedia",
  vi.fn((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
)

vi.stubGlobal(
  "ResizeObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

HTMLElement.prototype.scrollIntoView = vi.fn()
HTMLElement.prototype.hasPointerCapture = () => false
HTMLElement.prototype.setPointerCapture = vi.fn()
HTMLElement.prototype.releasePointerCapture = vi.fn()

beforeAll(() => server.listen({ onUnhandledFrame: "error" }))

afterEach(async () => {
  cleanup()
  useBoardFilter.setState({ category: "all" })
  server.resetHandlers()
  await resetMockBoard()
})

afterAll(() => server.close())
