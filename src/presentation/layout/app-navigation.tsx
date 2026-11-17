import { navigationItems } from "./navigation/navigation-items"
import { NavigationItem } from "./navigation/navigation-item"

type AppNavigationProps = {
  onNavigate?: () => void
}

export function AppNavigation({ onNavigate }: AppNavigationProps) {
  return (
    <nav aria-label="주 메뉴" className="grid gap-1.5">
      {navigationItems.map((item) => (
        <NavigationItem key={item.path} {...item} onNavigate={onNavigate} />
      ))}
    </nav>
  )
}
