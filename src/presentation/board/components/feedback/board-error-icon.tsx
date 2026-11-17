import { CloudOff } from "lucide-react"

export function BoardErrorIcon() {
  return (
    <span className="mb-5 rounded-2xl bg-destructive/10 p-4 text-destructive">
      <CloudOff className="size-7" />
    </span>
  )
}
