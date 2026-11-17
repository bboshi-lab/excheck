import { useId, useState } from "react"
import { ListChecks, Sparkles } from "lucide-react"
import type { Board } from "../../../../core/domain/board"
import type { Task } from "../../../../core/domain/task"
import { calculateReadiness } from "../../../../core/domain/readiness"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card"
import { Progress } from "../../ui/progress"
import { Badge } from "../../ui/badge"
import { useBoardFilter } from "../state/filter-store"
import { CreateTaskDialog } from "./create-task-dialog"
import { TaskFilters } from "./task-filters"
import { TaskItem } from "./task-item"

type TaskChecklistProps = {
  board: Board
}

export function TaskChecklist({ board }: TaskChecklistProps) {
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

  return (
    <Card className="gap-0 overflow-hidden border-white/7 bg-card/85 pb-0" data-entrance>
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-5">
        <div>
          <CardDescription className="mb-2 text-[10px] tracking-widest">출시 전 마지막 확인</CardDescription>
          <CardTitle role="heading" aria-level={2} className="flex items-center gap-2 text-base">
            출시 체크리스트
            <Badge variant="secondary" className="rounded-md text-[10px] font-normal">
              {board.tasks.length}
            </Badge>
          </CardTitle>
        </div>
        <CreateTaskDialog onCreated={handleCreated} />
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6">
        <TaskFilters value={category} panelId={panelId} onChange={setCategory} />
      </CardContent>
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${panelId}-${category}`}
        tabIndex={0}
        className="border-y border-white/5 bg-background/10"
      >
        {tasks.length ? (
          <ul aria-label="출시 체크 항목">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center px-5 py-14 text-center">
            <ListChecks className="mb-4 size-7 text-muted-foreground" />
            <h3 className="text-sm font-medium">아직 등록된 체크가 없어요.</h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              첫 체크를 추가하고 출시 준비를 시작해 보세요.
            </p>
          </div>
        )}
      </div>
      <div className="grid gap-3 bg-background/15 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3 text-primary" />
            작은 확인이 만드는 완성도
          </span>
          <span>
            {readiness.complete} / {readiness.total} 완료
          </span>
        </div>
        <Progress
          value={readiness.percent}
          aria-label="전체 체크 완료율"
          className="h-1 bg-white/5 [&>div]:bg-linear-to-r [&>div]:from-violet-400 [&>div]:to-cyan-300 [&>div]:transition-transform [&>div]:duration-500"
        />
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </Card>
  )
}
