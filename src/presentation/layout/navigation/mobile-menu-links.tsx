import { AppNavigation } from "@presentation/layout/app-navigation"
import { MobileMenuLinksLayout } from "@presentation/layout/navigation/mobile-menu-links-layout"

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
