import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"

import type { BoardGateway } from "@core/application/ports/board-gateway"
import { BoardGatewayProvider } from "@presentation/board/context/board-gateway-provider"
import { TooltipProvider } from "@ui/tooltip"

type AppProvidersProps = {
  children: ReactNode
  gateway: BoardGateway
  queryClient: QueryClient
}

export function AppProviders({ children, gateway, queryClient }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BoardGatewayProvider gateway={gateway}>
        <TooltipProvider delayDuration={250}>{children}</TooltipProvider>
      </BoardGatewayProvider>
    </QueryClientProvider>
  )
}
