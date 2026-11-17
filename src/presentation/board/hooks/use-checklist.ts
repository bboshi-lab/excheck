import { useId, useState } from "react"
import type { Board } from "@core/domain/board"
import { calculateReadiness } from "@core/domain/readiness"
import type { Task } from "@core/domain/task"
import { useBoardFilter } from "@presentation/board/state/filter-store"

export function useChecklist(board: Board) {
  const panelId = useId()
  const category = useBoardFilter((state) => state.category)
  const setCategory = useBoardFilter((state) => state.setCategory)
  const [announcement, setAnnouncement] = useState("")
  const tasks = board.tasks.filter((task) => category === "all" || task.category === category)
  const readiness = calculateReadiness(board.tasks)

  const handleCreated = (task: Task) => {
    setCategory(task.category)
    setAnnouncement(`${task.title} 체크를 추가했습니다.`)
  }

  return { panelId, category, setCategory, announcement, tasks, readiness, handleCreated }
}
