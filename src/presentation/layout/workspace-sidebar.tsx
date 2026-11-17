import { ArrowUpRight, CircleDot, Sparkles } from "lucide-react"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Brand } from "./brand"
import { AppNavigation } from "./app-navigation"

export function WorkspaceSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-white/7 bg-[#0e121e] px-5 py-7 lg:flex xl:w-64 xl:px-6">
      <Brand />
      <div className="mb-8 mt-9 flex items-center gap-3 rounded-xl border border-white/7 bg-white/3 p-3">
        <span className="grid size-9 place-items-center rounded-lg bg-linear-to-br from-violet-400/25 to-cyan-400/10 font-semibold text-violet-200">
          A
        </span>
        <div>
          <p className="text-xs font-medium">프로젝트 아틀라스</p>
          <p className="mt-1 text-[10px] text-muted-foreground">개인 워크스페이스</p>
        </div>
        <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="mb-3 px-3 text-[9px] tracking-[0.2em] text-slate-500">워크스페이스</p>
      <AppNavigation />
      <div className="mt-auto pt-10">
        <div className="rounded-xl border border-primary/10 bg-linear-to-br from-primary/8 to-transparent p-4">
          <Sparkles className="mb-3 size-4 text-primary" />
          <p className="text-xs font-medium">좋은 출시는 디테일에서.</p>
          <p className="mt-2 text-[11px] leading-6 text-muted-foreground">
            작은 확인을 쌓아
            <br />
            팀의 다음 도약을 준비하세요.
          </p>
        </div>
        <Separator className="my-5 bg-white/7" />
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="gap-1.5 border-cyan-300/15 py-1 text-[9px] text-cyan-200">
                <CircleDot className="size-2.5" />
                DEMO
              </Badge>
            </TooltipTrigger>
            <TooltipContent>새로고침하면 샘플 데이터로 초기화됩니다.</TooltipContent>
          </Tooltip>
          <span className="text-[10px] text-muted-foreground">자유롭게 실험해 보세요.</span>
        </div>
      </div>
    </aside>
  )
}
