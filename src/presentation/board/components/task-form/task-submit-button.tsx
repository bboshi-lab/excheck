import { Button } from "../../../ui/button"
import { TaskSubmitIcon } from "./task-submit-icon"

type TaskSubmitButtonProps = {
  pending: boolean
}

export function TaskSubmitButton({ pending }: TaskSubmitButtonProps) {
  return (
    <Button type="submit" disabled={pending}>
      <TaskSubmitIcon pending={pending} />
      {pending ? "저장 중…" : "추가하기"}
    </Button>
  )
}
