import { SidebarEncouragement } from "@presentation/layout/sidebar/sidebar-encouragement"
import { SidebarTipIcon } from "@presentation/layout/sidebar/sidebar-tip-icon"
import { SidebarTipLayout } from "@presentation/layout/sidebar/sidebar-tip-layout"
import { SidebarTipTitle } from "@presentation/layout/sidebar/sidebar-tip-title"

export function SidebarTip() {
  return (
    <SidebarTipLayout>
      <SidebarTipIcon />
      <SidebarTipTitle />
      <SidebarEncouragement />
    </SidebarTipLayout>
  )
}
