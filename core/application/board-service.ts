import { appendActivity } from "../domain/board"
import type { CreateTaskInput, Task } from "../domain/task"
import type { BoardGateway } from "./ports/board-gateway"
import type { BoardRepository } from "./ports/board-repository"
import type { BoardRuntime } from "./ports/board-runtime"
import { TaskNotFoundError } from "./task-not-found-error"

export class BoardService implements BoardGateway {
  constructor(
    private readonly repository: BoardRepository,
    private readonly runtime: BoardRuntime,
  ) {}

  getBoard() {
    return this.repository.read()
  }

  createTask(input: CreateTaskInput): Promise<Task> {
    return this.repository.update((board) => {
      const task: Task = {
        ...input,
        id: this.runtime.createId(),
        done: false,
      }

      board.tasks.push(task)
      appendActivity(board, {
        id: this.runtime.createId(),
        message: `Added “${task.title}”`,
        at: this.runtime.now(),
      })

      return task
    })
  }

  setTaskDone(id: string, done: boolean): Promise<Task> {
    return this.repository.update((board) => {
      const task = board.tasks.find((candidate) => candidate.id === id)

      if (!task) {
        throw new TaskNotFoundError()
      }

      task.done = done

      appendActivity(board, {
        id: this.runtime.createId(),
        message: `${done ? "Completed" : "Reopened"} “${task.title}”`,
        at: this.runtime.now(),
      })

      return task
    })
  }
}
