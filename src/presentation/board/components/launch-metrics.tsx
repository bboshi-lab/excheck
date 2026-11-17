import { Activity, CheckCheck, Flag } from "lucide-react"
import type { Board } from "../../../../core/domain/board"
import { calculateReadiness } from "../../../../core/domain/readiness"
import { MetricCard } from "./metric-card"
import { LaunchMetricsLayout } from "./metrics/launch-metrics-layout"

type LaunchMetricsProps = {
  board: Board
}

export function LaunchMetrics({ board }: LaunchMetricsProps) {
  const readiness = calculateReadiness(board.tasks)

  return (
    <LaunchMetricsLayout>
      <MetricCard
        label="완료한 체크"
        value={readiness.complete}
        description={`전체 ${readiness.total}개 중 완료 · 한 걸음 더 가까이`}
        icon={CheckCheck}
        accent="violet"
      />
      <MetricCard
        label="남은 체크"
        value={readiness.total - readiness.complete}
        description="출시 전에 확인할 마지막 디테일"
        icon={Flag}
        accent="amber"
      />
      <MetricCard
        label="최근 활동"
        unit="건"
        value={board.activity.length}
        description="현재 보드에 보관된 최신 기록 · 최대 20건"
        icon={Activity}
        accent="cyan"
      />
    </LaunchMetricsLayout>
  )
}
