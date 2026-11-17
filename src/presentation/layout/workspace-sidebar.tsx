import { AppNavigation } from "./app-navigation"
import { Brand } from "./brand"
import { SidebarFooter } from "./sidebar/sidebar-footer"
import { SidebarFrame } from "./sidebar/sidebar-frame"
import { SidebarProjectCard } from "./sidebar/sidebar-project-card"
import { SidebarSectionLabel } from "./sidebar/sidebar-section-label"

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
