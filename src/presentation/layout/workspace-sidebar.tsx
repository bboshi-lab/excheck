import { AppNavigation } from "@presentation/layout/app-navigation"
import { Brand } from "@presentation/layout/brand"
import { SidebarFooter } from "@presentation/layout/sidebar/sidebar-footer"
import { SidebarFrame } from "@presentation/layout/sidebar/sidebar-frame"
import { SidebarProjectCard } from "@presentation/layout/sidebar/sidebar-project-card"
import { SidebarSectionLabel } from "@presentation/layout/sidebar/sidebar-section-label"

export function WorkspaceSidebar() {
  return (
    <SidebarFrame>
      <Brand />
      <SidebarProjectCard />
      <SidebarSectionLabel />
      <AppNavigation />
      <SidebarFooter />
    </SidebarFrame>
  )
}
