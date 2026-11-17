import { SidebarDemoBadge } from "./sidebar-demo-badge"
import { SidebarDemoCaption } from "./sidebar-demo-caption"
import { SidebarDemoStatusLayout } from "./sidebar-demo-status-layout"

export function SidebarDemoStatus() {
  return (
    <SidebarDemoStatusLayout>
      <SidebarDemoBadge />
      <SidebarDemoCaption />
    </SidebarDemoStatusLayout>
  )
}
