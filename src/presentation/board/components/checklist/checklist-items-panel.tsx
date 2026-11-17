import type { Task } from "../../../../../core/domain/task"
import type { TaskFilter } from "../../state/filter-store"
import { TaskList } from "./task-list"

type ChecklistItemsPanelProps = {
  panelId: string
  category: TaskFilter
  tasks: Task[]
}

export function ChecklistItemsPanel({ panelId, category, tasks }: ChecklistItemsPanelProps) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={`${panelId}-${category}`}
      tabIndex={0}
      className="border-y border-white/5 bg-background/10"
    >
      <TaskList tasks={tasks} />
    </div>
  )
}
