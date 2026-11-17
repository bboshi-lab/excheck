import { FooterMotto } from "./footer-motto"
import { FooterSignature } from "./footer-signature"
import { WorkspaceFooterLayout } from "./workspace-footer-layout"

export function WorkspaceFooter() {
  return (
    <WorkspaceFooterLayout>
      <FooterMotto />
      <FooterSignature />
    </WorkspaceFooterLayout>
  )
}
