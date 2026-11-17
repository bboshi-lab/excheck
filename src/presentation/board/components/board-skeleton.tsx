import { BoardChecklistSkeleton } from "./feedback/board-checklist-skeleton"
import { BoardHeroSkeleton } from "./feedback/board-hero-skeleton"
import { BoardLoadingAnnouncement } from "./feedback/board-loading-announcement"
import { BoardLoadingLayout } from "./feedback/board-loading-layout"
import { BoardMetricsSkeleton } from "./feedback/board-metrics-skeleton"

export function BoardSkeleton() {
  return (
    <BoardLoadingLayout>
      <BoardHeroSkeleton />
      <BoardMetricsSkeleton />
      <BoardChecklistSkeleton />
      <BoardLoadingAnnouncement />
    </BoardLoadingLayout>
  )
}
