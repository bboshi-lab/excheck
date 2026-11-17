import { NavigationItem } from "./navigation/navigation-item"
import { navigationItems } from "./navigation/navigation-items"
import { NavigationListLayout } from "./navigation/navigation-list-layout"

type AppNavigationProps = {
  onNavigate?: () => void
}

export function AppNavigation({ onNavigate }: AppNavigationProps) {
  return (
    <NavigationListLayout>
      {navigationItems.map((item) => (
        <NavigationItem key={item.path} {...item} onNavigate={onNavigate} />
      ))}
    </NavigationListLayout>
  )
}
