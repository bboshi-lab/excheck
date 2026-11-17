import { useRef } from "react"
import { Outlet } from "react-router"

import { AppShellFrame } from "@presentation/layout/shell/app-shell-frame"
import { MainContent } from "@presentation/layout/shell/main-content"
import { PageHeading } from "@presentation/layout/shell/page-heading"
import { SkipToContentLink } from "@presentation/layout/shell/skip-to-content-link"
import { WorkspaceContent } from "@presentation/layout/shell/workspace-content"
import { WorkspaceFooter } from "@presentation/layout/shell/workspace-footer"
import { WorkspaceHeader } from "@presentation/layout/shell/workspace-header"
import { WorkspaceSidebar } from "@presentation/layout/workspace-sidebar"

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
