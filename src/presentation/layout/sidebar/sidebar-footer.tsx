import { SidebarDemoStatus } from "@presentation/layout/sidebar/sidebar-demo-status"
import { SidebarFooterLayout } from "@presentation/layout/sidebar/sidebar-footer-layout"
import { SidebarTip } from "@presentation/layout/sidebar/sidebar-tip"
import { Separator } from "@ui/separator"

export function SidebarFooter() {
  return (
    <SidebarFooterLayout>
      <SidebarTip />
      <Separator className="my-5 bg-white/7" />
      <SidebarDemoStatus />
    </SidebarFooterLayout>
  )
}
