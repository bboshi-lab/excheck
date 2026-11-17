import { SidebarEncouragement } from "./sidebar-encouragement"
import { SidebarTipIcon } from "./sidebar-tip-icon"
import { SidebarTipLayout } from "./sidebar-tip-layout"
import { SidebarTipTitle } from "./sidebar-tip-title"

export function SidebarTip() {
  return (
    <SidebarTipLayout>
      <SidebarTipIcon />
      <SidebarTipTitle />
      <SidebarEncouragement />
    </SidebarTipLayout>
  )
}
