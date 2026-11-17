import type { Task } from "@core/domain/task"

export const ACTIVITY_LIMIT = 20

export type Activity = {
  id: string
  message: string
  at: string
}

export type Board = {
  tasks: Task[]
  activity: Activity[]
}

export function appendActivity(board: Board, activity: Activity): void {
  board.activity = [activity, ...board.activity].slice(0, ACTIVITY_LIMIT)
}
