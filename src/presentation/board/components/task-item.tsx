import type { Task } from "../../../../core/domain/task"
import { useTaskItem } from "../hooks/use-task-item"
import { TaskItemLayout } from "./checklist/task-item-layout"
import { TaskItemContent } from "./checklist/task-item-content"
import { TaskToggle } from "./checklist/task-toggle"
import { TaskTitle } from "./checklist/task-title"
import { TaskSavingIndicator } from "./checklist/task-saving-indicator"
import { TaskCategoryBadge } from "./checklist/task-category-badge"
import { TaskMutationError } from "./checklist/task-mutation-error"

type TaskItemProps = {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const item = useTaskItem(task)

  return (
    <TaskItemLayout rowRef={item.row} pending={item.pending}>
      <TaskItemContent>
        <TaskToggle task={task} pending={item.pending} onChange={item.handleCheckedChange} />
        <TaskTitle title={task.title} done={task.done} />
        <TaskSavingIndicator pending={item.pending} />
        <TaskCategoryBadge category={task.category} />
      </TaskItemContent>
      <TaskMutationError error={item.error} />
    </TaskItemLayout>
  )
}
