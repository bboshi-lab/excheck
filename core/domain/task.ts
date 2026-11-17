export const TASK_CATEGORIES = ["Engineering", "Design", "Operations"] as const

export const TASK_TITLE_MIN_LENGTH = 3
export const TASK_TITLE_MAX_LENGTH = 100

export type TaskCategory = (typeof TASK_CATEGORIES)[number]

export type CreateTaskInput = {
  title: string
  category: TaskCategory
}

export type Task = CreateTaskInput & {
  id: string
  done: boolean
}
