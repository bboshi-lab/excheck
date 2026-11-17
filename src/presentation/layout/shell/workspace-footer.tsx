import { FooterMotto } from "@presentation/layout/shell/footer-motto"
import { FooterSignature } from "@presentation/layout/shell/footer-signature"
import { WorkspaceFooterLayout } from "@presentation/layout/shell/workspace-footer-layout"

export function WorkspaceFooter() {
  return (
    <WorkspaceFooterLayout>
      <FooterMotto />
      <FooterSignature />
    </WorkspaceFooterLayout>
  )
}
