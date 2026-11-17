import { ArrowUpRight } from "lucide-react"
import { ProjectAvatar } from "./project-avatar"
import { ProjectSummary } from "./project-summary"

export function SidebarProjectCard() {
  return (
    <div className="mb-8 mt-9 flex items-center gap-3 rounded-xl border border-white/7 bg-white/3 p-3">
      <ProjectAvatar />
      <ProjectSummary />
      <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" aria-hidden="true" />
    </div>
  )
}
