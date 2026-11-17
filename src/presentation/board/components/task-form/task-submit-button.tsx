import { TaskSubmitIcon } from "@presentation/board/components/task-form/task-submit-icon"
import { Button } from "@ui/button"

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
