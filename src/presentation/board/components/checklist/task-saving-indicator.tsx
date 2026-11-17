import { LoaderCircle } from "lucide-react"

type TaskSavingIndicatorProps = {
  pending: boolean
}

export function TaskSavingIndicator({ pending }: TaskSavingIndicatorProps) {
  if (!pending) return null

  return <LoaderCircle className="size-3.5 shrink-0 animate-spin text-primary" aria-label="저장 중" />
}
