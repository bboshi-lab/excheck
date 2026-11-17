import { Activity } from "lucide-react"

export function ActivityEmptyState() {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <Activity className="mb-3 size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">첫 활동을 기다리고 있어요.</p>
    </div>
  )
}
