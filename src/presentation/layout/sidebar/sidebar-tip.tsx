import { Sparkles } from "lucide-react"
import { SidebarEncouragement } from "./sidebar-encouragement"

export function SidebarTip() {
  return (
    <div className="rounded-xl border border-primary/10 bg-linear-to-br from-primary/8 to-transparent p-4">
      <Sparkles className="mb-3 size-4 text-primary" />
      <p className="text-xs font-medium">좋은 출시는 디테일에서.</p>
      <SidebarEncouragement />
    </div>
  )
}
