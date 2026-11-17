import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import type { Board } from "../../../../core/domain/board"
import { Button } from "../../ui/button"
import { useSectionEntrance } from "../../hooks/use-section-entrance"
import { ReleaseHero } from "./release-hero"
import { LaunchMetrics } from "./launch-metrics"
import { TaskChecklist } from "./task-checklist"
import { CategoryProgressChart } from "./category-progress-chart"
import { ActivityFeed } from "./activity-feed"

type DashboardViewProps = {
  board: Board
}

export function DashboardView({ board }: DashboardViewProps) {
  const scope = useSectionEntrance()

  return (
    <div ref={scope} className="grid gap-5 sm:gap-6">
      <ReleaseHero tasks={board.tasks} />
      <LaunchMetrics board={board} />
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] xl:gap-6">
        <TaskChecklist board={board} />
        <div className="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-1 xl:gap-6">
          <CategoryProgressChart tasks={board.tasks} />
          <div className="grid gap-2">
            <ActivityFeed activity={board.activity} compact />
            <Button variant="ghost" asChild className="justify-between px-3 text-[11px] text-muted-foreground">
              <Link to="/activity">
                모든 활동 살펴보기
                <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        data-entrance
        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/2 px-5 py-4 text-[11px] text-muted-foreground"
      >
        <p>마음껏 체크하고 실험하세요. 새로고침하면 샘플 데이터로 돌아갑니다.</p>
        <span className="shrink-0 text-violet-300/75">다음 도약을 위한 첫걸음 ↗</span>
      </div>
    </div>
  )
}
