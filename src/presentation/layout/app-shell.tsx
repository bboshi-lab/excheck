import { useRef } from "react"
import { Outlet } from "react-router"
import { WorkspaceSidebar } from "./workspace-sidebar"
import { AppShellFrame } from "./shell/app-shell-frame"
import { SkipToContentLink } from "./shell/skip-to-content-link"
import { WorkspaceContent } from "./shell/workspace-content"
import { WorkspaceHeader } from "./shell/workspace-header"
import { MainContent } from "./shell/main-content"
import { PageHeading } from "./shell/page-heading"
import { WorkspaceFooter } from "./shell/workspace-footer"

export function AppShell() {
  const main = useRef<HTMLElement>(null)

  return (
    <AppShellFrame>
      <SkipToContentLink target={main} />
      <WorkspaceSidebar />
      <WorkspaceContent>
        <WorkspaceHeader />
        <MainContent ref={main}>
          <PageHeading />
          <Outlet />
          <WorkspaceFooter />
        </MainContent>
      </WorkspaceContent>
    </AppShellFrame>
  )
}
