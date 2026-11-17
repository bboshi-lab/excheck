import { create } from "zustand"

export const useFilters = create<{
  category: string
  setCategory: (category: string) => void
}>((set) => ({
  category: "All",
  setCategory: (category) => set({ category }),
}))
