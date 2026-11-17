import type { Board } from "../../../../core/domain/board"

import { useSectionEntrance } from "../../hooks/use-section-entrance"

import { CategoryProgressChart } from "./category-progress-chart"
import { DashboardActivity } from "./dashboard/dashboard-activity"
import { DashboardInsights } from "./dashboard/dashboard-insights"
import { DashboardLayout } from "./dashboard/dashboard-layout"
import { DashboardPanels } from "./dashboard/dashboard-panels"
import { DemoResetNotice } from "./dashboard/demo-reset-notice"
import { LaunchMetrics } from "./launch-metrics"
import { ReleaseHero } from "./release-hero"
import { TaskChecklist } from "./task-checklist"

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
