import { create } from "zustand"
import { TASK_CATEGORIES, type TaskCategory } from "@core/domain/task"

export type TaskFilter = "all" | TaskCategory

type BoardFilterState = {
  category: TaskFilter
  setCategory: (category: TaskFilter) => void
}

export function isTaskFilter(value: string): value is TaskFilter {
  return value === "all" || TASK_CATEGORIES.some((category) => category === value)
}

export const useBoardFilter = create<BoardFilterState>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}))
