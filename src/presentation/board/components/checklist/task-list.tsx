import type { Task } from "@core/domain/task"
import { TaskEmptyState } from "@presentation/board/components/checklist/task-empty-state"
import { TaskListLayout } from "@presentation/board/components/checklist/task-list-layout"
import { TaskItem } from "@presentation/board/components/task-item"

type TaskListProps = {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) return <TaskEmptyState />

  return (
    <TaskListLayout>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </TaskListLayout>
  )
}
