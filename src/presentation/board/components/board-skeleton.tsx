import { BoardChecklistSkeleton } from "@presentation/board/components/feedback/board-checklist-skeleton"
import { BoardHeroSkeleton } from "@presentation/board/components/feedback/board-hero-skeleton"
import { BoardLoadingAnnouncement } from "@presentation/board/components/feedback/board-loading-announcement"
import { BoardLoadingLayout } from "@presentation/board/components/feedback/board-loading-layout"
import { BoardMetricsSkeleton } from "@presentation/board/components/feedback/board-metrics-skeleton"

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
