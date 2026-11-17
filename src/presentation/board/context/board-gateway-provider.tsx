import { createContext, useContext, type ReactNode } from "react"
import type { BoardGateway } from "../../../../core/application/ports/board-gateway"

const BoardGatewayContext = createContext<BoardGateway | null>(null)

type BoardGatewayProviderProps = {
  gateway: BoardGateway
  children: ReactNode
}

export function BoardGatewayProvider({ gateway, children }: BoardGatewayProviderProps) {
  return <BoardGatewayContext.Provider value={gateway}>{children}</BoardGatewayContext.Provider>
}

export function useBoardGateway() {
  const gateway = useContext(BoardGatewayContext)

  if (!gateway) throw new Error("BoardGatewayProvider가 필요합니다.")

  return gateway
}
