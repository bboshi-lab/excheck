import type { Board } from "../../../../core/domain/board"
import { Card } from "../../ui/card"
import { LiveAnnouncement } from "../../components/live-announcement"
import { useChecklist } from "../hooks/use-checklist"
import { ChecklistHeader } from "./checklist/checklist-header"
import { ChecklistFilters } from "./checklist/checklist-filters"
import { ChecklistItemsPanel } from "./checklist/checklist-items-panel"
import { ChecklistProgress } from "./checklist/checklist-progress"

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
