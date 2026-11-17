import type { Task } from "@core/domain/task"
import { TaskCategoryBadge } from "@presentation/board/components/checklist/task-category-badge"
import { TaskItemContent } from "@presentation/board/components/checklist/task-item-content"
import { TaskItemLayout } from "@presentation/board/components/checklist/task-item-layout"
import { TaskMutationError } from "@presentation/board/components/checklist/task-mutation-error"
import { TaskSavingIndicator } from "@presentation/board/components/checklist/task-saving-indicator"
import { TaskTitle } from "@presentation/board/components/checklist/task-title"
import { TaskToggle } from "@presentation/board/components/checklist/task-toggle"
import { useTaskItem } from "@presentation/board/hooks/use-task-item"

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
