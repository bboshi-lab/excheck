import type { Task } from "./task"

export type Readiness = {
  complete: number
  total: number
  percent: number
}

export function calculateReadiness(tasks: readonly Task[]): Readiness {
  const complete = tasks.filter((task) => task.done).length

  return {
    complete,
    total: tasks.length,
    percent: tasks.length ? Math.round((complete / tasks.length) * 100) : 0,
  }
}
