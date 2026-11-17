import { useState } from "react"
import { Plus } from "lucide-react"
import type { CreateTaskInput, Task } from "../../../../core/domain/task"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { useCreateTask } from "../api/board-hooks"
import { TaskForm } from "./task-form"

type CreateTaskDialogProps = {
  onCreated: (task: Task) => void
}

export function CreateTaskDialog({ onCreated }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const mutation = useCreateTask()

  const handleOpenChange = (nextOpen: boolean) => {
    if (mutation.isPending) return

    mutation.reset()
    setOpen(nextOpen)
  }

  const handleCancel = () => handleOpenChange(false)

  const handleSubmit = (input: CreateTaskInput) => {
    if (mutation.isPending) return

    mutation.mutate(input, {
      onSuccess: (task) => {
        onCreated(task)
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          체크 추가
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={!mutation.isPending} className="border-white/10 bg-popover sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">완성도를 높이는 작은 확인.</DialogTitle>
          <DialogDescription className="pt-1 leading-6">
            출시 전에 필요한 일을 기록하세요.
            <br />
            추가한 체크는 준비 현황에 바로 반영됩니다.
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          pending={mutation.isPending}
          error={mutation.error?.message ?? null}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  )
}
