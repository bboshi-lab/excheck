import { Brand } from "../brand"
import { MobileNavigation } from "../mobile-navigation"

export function MobileHeaderIdentity() {
  return (
    <div className="flex items-center gap-3 lg:hidden">
      <MobileNavigation />
      <Brand />
    </div>
  )
}
