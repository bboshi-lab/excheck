import { AppNavigation } from "../app-navigation"
import { MobileMenuLinksLayout } from "./mobile-menu-links-layout"

type MobileMenuLinksProps = {
  onNavigate: () => void
}

export function MobileMenuLinks({ onNavigate }: MobileMenuLinksProps) {
  return (
    <MobileMenuLinksLayout>
      <AppNavigation onNavigate={onNavigate} />
    </MobileMenuLinksLayout>
  )
}
