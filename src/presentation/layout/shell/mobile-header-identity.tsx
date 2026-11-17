import { Brand } from "../brand"
import { MobileNavigation } from "../mobile-navigation"
import { MobileHeaderIdentityLayout } from "./mobile-header-identity-layout"

export function MobileHeaderIdentity() {
  return (
    <MobileHeaderIdentityLayout>
      <MobileNavigation />
      <Brand />
    </MobileHeaderIdentityLayout>
  )
}
