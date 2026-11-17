import type { Task } from "@core/domain/task"
import { ChecklistItemsPanelLayout } from "@presentation/board/components/checklist/checklist-items-panel-layout"
import { TaskList } from "@presentation/board/components/checklist/task-list"
import type { TaskFilter } from "@presentation/board/state/filter-store"

type ChecklistItemsPanelProps = {
  panelId: string
  category: TaskFilter
  tasks: Task[]
}

export function ChecklistItemsPanel({ panelId, category, tasks }: ChecklistItemsPanelProps) {
  return (
    <ChecklistItemsPanelLayout panelId={panelId} category={category}>
      <TaskList tasks={tasks} />
    </ChecklistItemsPanelLayout>
  )
}
