import { Brand } from "@presentation/layout/brand"
import { MobileNavigation } from "@presentation/layout/mobile-navigation"
import { MobileHeaderIdentityLayout } from "@presentation/layout/shell/mobile-header-identity-layout"

export function MobileHeaderIdentity() {
  return (
    <MobileHeaderIdentityLayout>
      <MobileNavigation />
      <Brand />
    </MobileHeaderIdentityLayout>
  )
}
