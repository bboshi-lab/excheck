import { useId, useRef, useState, type FormEvent } from "react"
import { ArrowUpRight, LoaderCircle } from "lucide-react"
import { createTaskSchema } from "../../../../core/contracts/task-contract"
import { TASK_CATEGORIES, type CreateTaskInput, type TaskCategory } from "../../../../core/domain/task"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { categoryLabels } from "../labels"

type TaskFormProps = {
  pending: boolean
  error: string | null
  onSubmit: (input: CreateTaskInput) => void
  onCancel: () => void
}

export function TaskForm({ pending, error, onSubmit, onCancel }: TaskFormProps) {
  const titleId = useId()
  const categoryId = useId()
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

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6 pt-2">
      <div className="grid gap-2.5">
        <Label htmlFor={titleId}>체크 제목</Label>
        <Input
          ref={titleInput}
          id={titleId}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="예: 배포 전 접근성 최종 검토"
          maxLength={100}
          disabled={pending}
          aria-invalid={Boolean(validationError)}
          aria-describedby={`${titleId}-help`}
          className="h-11"
        />
        <p
          id={`${titleId}-help`}
          role={validationError ? "alert" : undefined}
          className={`text-xs leading-5 ${validationError ? "text-destructive" : "text-muted-foreground"}`}
        >
          {validationError || "양끝 공백을 제외한 3~100자. 팀이 이해할 수 있는 구체적인 이름이면 좋아요."}
        </p>
      </div>
      <div className="grid gap-2.5">
        <Label htmlFor={categoryId}>분야</Label>
        <Select value={category} onValueChange={handleCategoryChange} disabled={pending}>
          <SelectTrigger id={categoryId} className="h-11 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TASK_CATEGORIES.map((item) => (
              <SelectItem key={item} value={item}>
                {categoryLabels[item]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs leading-6 text-destructive"
        >
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2 border-t border-white/8 pt-5">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
          취소
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? <LoaderCircle className="animate-spin" /> : <ArrowUpRight />}
          {pending ? "저장 중…" : "추가하기"}
        </Button>
      </div>
    </form>
  )
}
