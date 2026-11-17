import type { Task } from "../../../../../core/domain/task"
import { TaskItem } from "../task-item"
import { TaskEmptyState } from "./task-empty-state"

type TaskListProps = {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) return <TaskEmptyState />

  return (
    <ul aria-label="출시 체크 항목">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
