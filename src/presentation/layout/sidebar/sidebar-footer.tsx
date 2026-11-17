import { Separator } from "../../ui/separator"
import { SidebarTip } from "./sidebar-tip"
import { SidebarDemoStatus } from "./sidebar-demo-status"

export function SidebarFooter() {
  return (
    <div className="mt-auto pt-10">
      <SidebarTip />
      <Separator className="my-5 bg-white/7" />
      <SidebarDemoStatus />
    </div>
  )
}
