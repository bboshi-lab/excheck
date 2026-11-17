import { Plus } from "lucide-react"
import { Button } from "@ui/button"
import { DialogTrigger } from "@ui/dialog"

export function CreateTaskTrigger() {
  return (
    <DialogTrigger asChild>
      <Button size="sm" className="gap-1.5">
        <Plus className="size-3.5" />
        체크 추가
      </Button>
    </DialogTrigger>
  )
}
