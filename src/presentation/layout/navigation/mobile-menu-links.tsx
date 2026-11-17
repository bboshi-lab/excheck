import { AppNavigation } from "../app-navigation"

type MobileMenuLinksProps = {
  onNavigate: () => void
}

export function MobileMenuLinks({ onNavigate }: MobileMenuLinksProps) {
  return (
    <div className="px-5">
      <AppNavigation onNavigate={onNavigate} />
    </div>
  )
}
