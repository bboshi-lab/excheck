import type { Task } from "@core/domain/task"
import { ChecklistTitle } from "@presentation/board/components/checklist/checklist-title"
import { CreateTaskDialog } from "@presentation/board/components/create-task-dialog"
import { PanelHeading } from "@presentation/components/panel-heading"

type ChecklistHeaderProps = {
  count: number
  onCreated: (task: Task) => void
}

export function ChecklistHeader({ count, onCreated }: ChecklistHeaderProps) {
  return (
    <PanelHeading
      className="items-center pb-5"
      eyebrow="출시 전 마지막 확인"
      title={<ChecklistTitle count={count} />}
      action={<CreateTaskDialog onCreated={onCreated} />}
    />
  )
}
