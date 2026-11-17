import { CircleDot } from "lucide-react"

import { Badge } from "../../ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"

export function SidebarDemoBadge() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge tabIndex={0} variant="outline" className="gap-1.5 border-cyan-300/15 py-1 text-[9px] text-cyan-200">
          <CircleDot className="size-2.5" />
          데모
        </Badge>
      </TooltipTrigger>
      <TooltipContent>새로고침하면 샘플 데이터로 초기화됩니다.</TooltipContent>
    </Tooltip>
  )
}
