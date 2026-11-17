import { Brand } from "./brand"
import { AppNavigation } from "./app-navigation"
import { SidebarFrame } from "./sidebar/sidebar-frame"
import { SidebarProjectCard } from "./sidebar/sidebar-project-card"
import { SidebarSectionLabel } from "./sidebar/sidebar-section-label"
import { SidebarFooter } from "./sidebar/sidebar-footer"

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
