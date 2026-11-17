import { CircleDot } from "lucide-react"

import { Badge } from "../../ui/badge"

export function WorkspaceDemoBadge() {
  return (
    <Badge
      variant="outline"
      className="shrink-0 gap-1.5 border-cyan-300/15 py-1.5 text-[9px] font-normal text-cyan-200"
    >
      <CircleDot className="size-2.5" />
      <span className="hidden sm:inline">나만의 </span>데모
      <span className="hidden min-[400px]:inline"> 워크스페이스</span>
    </Badge>
  )
}
