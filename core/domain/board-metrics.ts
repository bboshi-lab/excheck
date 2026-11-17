import { TASK_CATEGORIES, type Task, type TaskCategory } from "./task"

export type CategorySummary = {
  category: TaskCategory
  complete: number
  remaining: number
  total: number
  percent: number
}

export function summarizeCategories(tasks: readonly Task[]): CategorySummary[] {
  return TASK_CATEGORIES.map((category) => {
    const categoryTasks = tasks.filter((task) => task.category === category)
    const complete = categoryTasks.filter((task) => task.done).length
    const total = categoryTasks.length

    return {
      category,
      complete,
      remaining: total - complete,
      total,
      percent: total ? Math.round((complete / total) * 100) : 0,
    }
  })
}
