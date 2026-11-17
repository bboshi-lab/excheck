import type { Task } from "../../../../../core/domain/task"

import { TaskItem } from "../task-item"
import { TaskEmptyState } from "./task-empty-state"
import { TaskListLayout } from "./task-list-layout"

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
