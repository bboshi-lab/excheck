import { BoardLoadingLayout } from "./feedback/board-loading-layout"
import { BoardHeroSkeleton } from "./feedback/board-hero-skeleton"
import { BoardMetricsSkeleton } from "./feedback/board-metrics-skeleton"
import { BoardChecklistSkeleton } from "./feedback/board-checklist-skeleton"
import { BoardLoadingAnnouncement } from "./feedback/board-loading-announcement"

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
