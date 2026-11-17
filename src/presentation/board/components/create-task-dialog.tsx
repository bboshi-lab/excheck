import { useState } from "react"

import type { CreateTaskInput, Task } from "../../../../core/domain/task"

import { Dialog, DialogContent } from "../../ui/dialog"

import { useCreateTask } from "../api/board-hooks"
import { CreateTaskHeader } from "./dialog/create-task-header"
import { CreateTaskTrigger } from "./dialog/create-task-trigger"
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
