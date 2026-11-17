import type { Board } from "@core/domain/board"
import type { CreateTaskInput, Task } from "@core/domain/task"

export type BoardGateway = {
  getBoard(): Promise<Board>
  createTask(input: CreateTaskInput): Promise<Task>
  setTaskDone(id: string, done: boolean): Promise<Task>
}
