import type { Task } from "../../../../../core/domain/task"

import type { TaskFilter } from "../../state/filter-store"
import { ChecklistItemsPanelLayout } from "./checklist-items-panel-layout"
import { TaskList } from "./task-list"

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
