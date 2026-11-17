import { NavigationItem } from "@presentation/layout/navigation/navigation-item"
import { navigationItems } from "@presentation/layout/navigation/navigation-items"
import { NavigationListLayout } from "@presentation/layout/navigation/navigation-list-layout"

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
