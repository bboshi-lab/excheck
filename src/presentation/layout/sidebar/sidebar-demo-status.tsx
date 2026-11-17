import { SidebarDemoBadge } from "@presentation/layout/sidebar/sidebar-demo-badge"
import { SidebarDemoCaption } from "@presentation/layout/sidebar/sidebar-demo-caption"
import { SidebarDemoStatusLayout } from "@presentation/layout/sidebar/sidebar-demo-status-layout"

export function SidebarDemoStatus() {
  return (
    <SidebarDemoStatusLayout>
      <SidebarDemoBadge />
      <SidebarDemoCaption />
    </SidebarDemoStatusLayout>
  )
}
