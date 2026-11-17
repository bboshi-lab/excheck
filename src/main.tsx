import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router"
import { AppProviders } from "@app/app-providers"
import { AppRoutes } from "@app/app-routes"
import { createQueryClient } from "@app/create-query-client"
import { createBoardHttpClient } from "@client/http/board-http-client"
import "@/styles.css"

async function start() {
  if ((import.meta.env.VITE_API_MODE || "mock") === "mock") {
    const { worker } = await import("@mocks/browser")

    await worker.start({
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      onUnhandledFrame: "bypass",
    })
  }

  const gateway = createBoardHttpClient(`${import.meta.env.BASE_URL}api/`)
  const queryClient = createQueryClient()

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProviders gateway={gateway} queryClient={queryClient}>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </AppProviders>
    </StrictMode>,
  )
}

start().catch(() => {
  document.getElementById("root")!.textContent = "워크스페이스를 시작하지 못했습니다. 페이지를 새로고침해 주세요."
})
