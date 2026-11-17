import { ArrowUpRight } from "lucide-react"

import { ProjectAvatar } from "./project-avatar"
import { ProjectSummary } from "./project-summary"
import { SidebarProjectCardLayout } from "./sidebar-project-card-layout"

export function SidebarProjectCard() {
  return (
    <SidebarProjectCardLayout>
      <ProjectAvatar />
      <ProjectSummary />
      <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" aria-hidden="true" />
    </SidebarProjectCardLayout>
  )
}
