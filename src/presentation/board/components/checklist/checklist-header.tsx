import type { Task } from "../../../../../core/domain/task"
import { PanelHeading } from "../../../components/panel-heading"
import { CreateTaskDialog } from "../create-task-dialog"
import { ChecklistTitle } from "./checklist-title"

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
