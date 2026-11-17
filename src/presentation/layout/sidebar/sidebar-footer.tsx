import { Separator } from "../../ui/separator"

import { SidebarDemoStatus } from "./sidebar-demo-status"
import { SidebarFooterLayout } from "./sidebar-footer-layout"
import { SidebarTip } from "./sidebar-tip"

export function SidebarFooter() {
  return (
    <SidebarFooterLayout>
      <SidebarTip />
      <Separator className="my-5 bg-white/7" />
      <SidebarDemoStatus />
    </SidebarFooterLayout>
  )
}
