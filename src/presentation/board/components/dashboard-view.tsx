import type { Board } from "../../../../core/domain/board"
import { useSectionEntrance } from "../../hooks/use-section-entrance"
import { ReleaseHero } from "./release-hero"
import { LaunchMetrics } from "./launch-metrics"
import { TaskChecklist } from "./task-checklist"
import { CategoryProgressChart } from "./category-progress-chart"
import { DashboardLayout } from "./dashboard/dashboard-layout"
import { DashboardPanels } from "./dashboard/dashboard-panels"
import { DashboardInsights } from "./dashboard/dashboard-insights"
import { DashboardActivity } from "./dashboard/dashboard-activity"
import { DemoResetNotice } from "./dashboard/demo-reset-notice"

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
