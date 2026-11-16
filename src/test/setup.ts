import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { useFilters } from "../store";
import { cleanup } from "@testing-library/react";
import { handlers, resetMockBoard } from "../mocks/handlers";
export const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterEach(() => {
  cleanup();
  useFilters.setState({ category: "All" });
  server.resetHandlers();
  resetMockBoard();
});
afterAll(() => server.close());
