import { Button } from "../../../ui/button"

type TaskCancelButtonProps = {
  pending: boolean
  onCancel: () => void
}

export function TaskCancelButton({ pending, onCancel }: TaskCancelButtonProps) {
  return (
    <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
      취소
    </Button>
  )
}
