import { ChevronRight } from "lucide-react"

export function WorkspaceBreadcrumb() {
  return (
    <div className="hidden items-center gap-2 text-[11px] text-muted-foreground lg:flex">
      <span>워크스페이스</span>
      <ChevronRight className="size-3" />
      <span className="text-slate-300">프로젝트 아틀라스</span>
    </div>
  )
}
