import type { Board } from "@core/domain/board"
import { ChecklistFilters } from "@presentation/board/components/checklist/checklist-filters"
import { ChecklistHeader } from "@presentation/board/components/checklist/checklist-header"
import { ChecklistItemsPanel } from "@presentation/board/components/checklist/checklist-items-panel"
import { ChecklistProgress } from "@presentation/board/components/checklist/checklist-progress"
import { useChecklist } from "@presentation/board/hooks/use-checklist"
import { LiveAnnouncement } from "@presentation/components/live-announcement"
import { Card } from "@ui/card"

type TaskChecklistProps = {
  board: Board
}

export function TaskChecklist({ board }: TaskChecklistProps) {
  const checklist = useChecklist(board)

  return (
    <Card className="gap-0 overflow-hidden border-white/7 bg-card/85 pb-0" data-entrance>
      <ChecklistHeader count={board.tasks.length} onCreated={checklist.handleCreated} />
      <ChecklistFilters category={checklist.category} panelId={checklist.panelId} onChange={checklist.setCategory} />
      <ChecklistItemsPanel panelId={checklist.panelId} category={checklist.category} tasks={checklist.tasks} />
      <ChecklistProgress readiness={checklist.readiness} />
      <LiveAnnouncement message={checklist.announcement} />
    </Card>
  )
}
