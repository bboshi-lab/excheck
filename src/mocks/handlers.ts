import { createMockBoardApi } from "../../infrastructure/http/create-mock-board-api"

const mockBoard = createMockBoardApi({
  origin: window.location.origin,
  basePath: `${import.meta.env.BASE_URL}api`,
})

export const handlers = mockBoard.handlers
export const resetMockBoard = mockBoard.reset
