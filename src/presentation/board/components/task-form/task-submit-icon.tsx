import { ArrowUpRight, LoaderCircle } from "lucide-react"

type TaskSubmitIconProps = {
  pending: boolean
}

export function TaskSubmitIcon({ pending }: TaskSubmitIconProps) {
  if (pending) return <LoaderCircle className="animate-spin" />

  return <ArrowUpRight />
}
