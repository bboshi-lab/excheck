import { ArrowUpRight, Orbit, Radio } from "lucide-react"
import { Link } from "react-router"
import type { Task } from "../../../../core/domain/task"
import { calculateReadiness } from "../../../../core/domain/readiness"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { ReadinessRing } from "./readiness-ring"

type ReleaseHeroProps = {
  tasks: Task[]
}

export function ReleaseHero({ tasks }: ReleaseHeroProps) {
  const readiness = calculateReadiness(tasks)
  const remaining = readiness.total - readiness.complete
  const status = !readiness.total ? "체크를 등록해 보세요" : remaining ? "출시 준비 중" : "모든 체크 완료"

  return (
    <section
      className="release-hero relative overflow-hidden rounded-2xl border border-violet-300/15 p-6 sm:p-8"
      data-entrance
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="max-w-md">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="gap-1.5 border-primary/25 bg-primary/10 py-1 text-[10px] text-violet-200"
            >
              <Radio className="size-3" />
              {status}
            </Badge>
            <span className="text-[10px] tracking-[0.15em] text-muted-foreground">프로젝트 아틀라스 / v1.0</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.35] tracking-tight sm:text-[2.5rem]">
            다음 릴리스,
            <br />
            <span className="bg-linear-to-r from-violet-200 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
              확신을 가지고.
            </span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300/80">
            작은 체크가 모여 완성도 높은 출시를 만듭니다.
            <br className="hidden sm:block" /> 지금, 마지막 디테일을 함께 확인하세요.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button asChild className="shadow-lg shadow-violet-500/10">
              <Link to="/checks">
                체크리스트 살펴보기
                <ArrowUpRight />
              </Link>
            </Button>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Orbit className="size-3.5" />
              {remaining}개의 다음 한 걸음
            </span>
          </div>
        </div>
        <ReadinessRing readiness={readiness} />
      </div>
      <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/7 pt-4 text-[10px] text-slate-400">
        <span>체크 완료율을 기반으로 한 준비 지표</span>
        <span className="text-violet-200/65">최종 출시 결정은 팀의 검토가 필요합니다.</span>
      </div>
    </section>
  )
}
