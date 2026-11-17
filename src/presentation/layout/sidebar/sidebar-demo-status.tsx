import { SidebarDemoBadge } from "./sidebar-demo-badge"
import { SidebarDemoCaption } from "./sidebar-demo-caption"

export function SidebarDemoStatus() {
  return (
    <div className="flex items-center gap-3">
      <SidebarDemoBadge />
      <SidebarDemoCaption />
    </div>
  )
}
