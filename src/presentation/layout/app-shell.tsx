import { CircleDot, ChevronRight } from "lucide-react"
import { useRef, type MouseEvent } from "react"
import { Outlet, useLocation } from "react-router"
import { Badge } from "../ui/badge"
import { Brand } from "./brand"
import { MobileNavigation } from "./mobile-navigation"
import { WorkspaceSidebar } from "./workspace-sidebar"

const pageTitles: Record<string, { label: string; title: string; description: string }> = {
  "/": {
    label: "대시보드",
    title: "출시의 모든 순간을, 한눈에.",
    description: "팀의 다음 도약을 위한 준비 상황을 확인하세요.",
  },
  "/checks": {
    label: "출시 체크리스트",
    title: "마지막 디테일까지, 빈틈없이.",
    description: "출시 전에 필요한 확인을 한곳에서 관리하세요.",
  },
  "/activity": {
    label: "활동 타임라인",
    title: "작은 변화가 쌓이는 곳.",
    description: "최근 20개의 활동으로 준비 과정을 돌아보세요.",
  },
}

export function AppShell() {
  const main = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const page = pageTitles[pathname] ?? {
    label: "페이지 없음",
    title: "잠시 길을 잃었네요.",
    description: "대시보드에서 다시 시작해 주세요.",
  }

  const handleSkipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    main.current?.focus()
  }

  return (
    <div className="ambient-background min-h-screen">
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only z-100 rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        본문으로 건너뛰기
      </a>
      <WorkspaceSidebar />
      <div className="lg:pl-60 xl:pl-64">
        <header className="flex h-17 items-center justify-between gap-3 border-b border-white/6 px-4 sm:px-8 xl:px-10">
          <div className="flex items-center gap-3 lg:hidden">
            <MobileNavigation />
            <Brand />
          </div>
          <div className="hidden items-center gap-2 text-[11px] text-muted-foreground lg:flex">
            <span>워크스페이스</span>
            <ChevronRight className="size-3" />
            <span className="text-slate-300">프로젝트 아틀라스</span>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 gap-1.5 border-cyan-300/15 py-1.5 text-[9px] font-normal text-cyan-200"
          >
            <CircleDot className="size-2.5" />
            <span className="hidden sm:inline">나만의 </span>데모
            <span className="hidden min-[400px]:inline"> 워크스페이스</span>
          </Badge>
        </header>
        <main
          ref={main}
          id="main-content"
          tabIndex={-1}
          className="mx-auto max-w-375 px-4 pb-6 pt-7 focus:outline-none sm:px-8 sm:pt-9 xl:px-10"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[9px] tracking-[0.18em] text-primary/75">출시 관제 / {page.label}</p>
              <h1 className="text-[26px] font-semibold leading-snug tracking-tight sm:text-[30px]">{page.title}</h1>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{page.description}</p>
            </div>
            <span className="hidden shrink-0 rounded-lg border border-white/8 bg-white/2 px-3 py-2 text-[10px] text-slate-400 xl:block">
              프로젝트 아틀라스 <span className="ml-2 text-violet-300">v1.0</span>
            </span>
          </div>
          <Outlet />
          <footer className="mt-9 flex flex-wrap items-center justify-between gap-2 border-t border-white/6 pt-5 text-[9px] tracking-wide text-slate-500">
            <span>작은 디테일이 좋은 출시를 만듭니다.</span>
            <span>LAUNCHBOARD · 다음 출시를 위한 작업 공간</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
