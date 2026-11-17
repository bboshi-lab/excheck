import { MobileHeaderIdentity } from "@presentation/layout/shell/mobile-header-identity"
import { WorkspaceBreadcrumb } from "@presentation/layout/shell/workspace-breadcrumb"
import { WorkspaceDemoBadge } from "@presentation/layout/shell/workspace-demo-badge"
import { WorkspaceHeaderLayout } from "@presentation/layout/shell/workspace-header-layout"

export function WorkspaceHeader() {
  return (
    <WorkspaceHeaderLayout>
      <MobileHeaderIdentity />
      <WorkspaceBreadcrumb />
      <WorkspaceDemoBadge />
    </WorkspaceHeaderLayout>
  )
}
