import type { BoardGateway } from "@core/application/ports/board-gateway"
import type { BoardRepository } from "@core/application/ports/board-repository"
import type { BoardRuntime } from "@core/application/ports/board-runtime"
import { TaskNotFoundError } from "@core/application/task-not-found-error"
import { appendActivity } from "@core/domain/board"
import type { CreateTaskInput, Task } from "@core/domain/task"

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
        message: `추가: “${task.title}”`,
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
        message: `${done ? "완료" : "재개"}: “${task.title}”`,
        at: this.runtime.now(),
      })

      return task
    })
  }
}
