import { useRef, useState, type FormEvent } from "react"

import { createTaskSchema } from "../../../../core/contracts/task-contract"
import type { CreateTaskInput, TaskCategory } from "../../../../core/domain/task"

type TaskFormOptions = {
  pending: boolean
  onSubmit: (input: CreateTaskInput) => void
}

export function useTaskForm({ pending, onSubmit }: TaskFormOptions) {
  const titleInput = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<TaskCategory>("Engineering")
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleCategoryChange = (value: string) => {
    const result = createTaskSchema.shape.category.safeParse(value)

    if (result.success) setCategory(result.data)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (pending) return

    const result = createTaskSchema.safeParse({ title, category })

    if (!result.success) {
      setValidationError("제목은 양끝 공백을 제외하고 3~100자로 입력해 주세요.")
      titleInput.current?.focus()
      return
    }

    setValidationError(null)
    onSubmit(result.data)
  }

  return { titleInput, title, category, validationError, setTitle, handleCategoryChange, handleSubmit }
}
