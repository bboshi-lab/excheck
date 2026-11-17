import { WorkspaceHeaderLayout } from "./workspace-header-layout"
import { MobileHeaderIdentity } from "./mobile-header-identity"
import { WorkspaceBreadcrumb } from "./workspace-breadcrumb"
import { WorkspaceDemoBadge } from "./workspace-demo-badge"

export function WorkspaceHeader() {
  return (
    <WorkspaceHeaderLayout>
      <MobileHeaderIdentity />
      <WorkspaceBreadcrumb />
      <WorkspaceDemoBadge />
    </WorkspaceHeaderLayout>
  )
}
