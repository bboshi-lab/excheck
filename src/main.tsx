import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HashRouter } from "react-router"
import App from "./App"
import "./styles.css"

async function start() {
  if ((import.meta.env.VITE_API_MODE || "mock") === "mock") {
    const { worker } = await import("./mocks/browser")

    await worker.start({
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      onUnhandledFrame: "bypass",
    })
  }

  const client = new QueryClient({
    defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
  })

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}

start().catch(() => {
  document.getElementById("root")!.textContent = "Workspace could not start. Reload this page to retry."
})
