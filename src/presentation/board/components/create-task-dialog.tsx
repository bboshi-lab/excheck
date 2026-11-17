import { useState } from "react"
import type { CreateTaskInput, Task } from "@core/domain/task"
import { useCreateTask } from "@presentation/board/api/board-hooks"
import { CreateTaskHeader } from "@presentation/board/components/dialog/create-task-header"
import { CreateTaskTrigger } from "@presentation/board/components/dialog/create-task-trigger"
import { TaskForm } from "@presentation/board/components/task-form"
import { Dialog, DialogContent } from "@ui/dialog"

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
      <CreateTaskTrigger />
      <DialogContent showCloseButton={!mutation.isPending} className="border-white/10 bg-popover sm:max-w-md">
        <CreateTaskHeader />
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
