import type { Board } from "@core/domain/board"
import { CategoryProgressChart } from "@presentation/board/components/category-progress-chart"
import { DashboardActivity } from "@presentation/board/components/dashboard/dashboard-activity"
import { DashboardInsights } from "@presentation/board/components/dashboard/dashboard-insights"
import { DashboardLayout } from "@presentation/board/components/dashboard/dashboard-layout"
import { DashboardPanels } from "@presentation/board/components/dashboard/dashboard-panels"
import { DemoResetNotice } from "@presentation/board/components/dashboard/demo-reset-notice"
import { LaunchMetrics } from "@presentation/board/components/launch-metrics"
import { ReleaseHero } from "@presentation/board/components/release-hero"
import { TaskChecklist } from "@presentation/board/components/task-checklist"
import { useSectionEntrance } from "@presentation/hooks/use-section-entrance"

type DashboardViewProps = {
  board: Board
}

export function DashboardView({ board }: DashboardViewProps) {
  const scope = useSectionEntrance()

  return (
    <DashboardLayout ref={scope}>
      <ReleaseHero tasks={board.tasks} />
      <LaunchMetrics board={board} />
      <DashboardPanels>
        <TaskChecklist board={board} />
        <DashboardInsights>
          <CategoryProgressChart tasks={board.tasks} />
          <DashboardActivity activity={board.activity} />
        </DashboardInsights>
      </DashboardPanels>
      <DemoResetNotice />
    </DashboardLayout>
  )
}
