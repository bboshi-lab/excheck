import { useId, type Ref } from "react"
import { FormField } from "../../../components/form-field"
import { Label } from "../../../ui/label"
import { Input } from "../../../ui/input"
import { TaskTitleHelp } from "./task-title-help"

type TaskTitleFieldProps = {
  inputRef: Ref<HTMLInputElement>
  value: string
  pending: boolean
  error: string | null
  onChange: (value: string) => void
}

export function TaskTitleField({ inputRef, value, pending, error, onChange }: TaskTitleFieldProps) {
  const id = useId()

  return (
    <FormField>
      <Label htmlFor={id}>체크 제목</Label>
      <Input
        ref={inputRef}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="예: 배포 전 접근성 최종 검토"
        maxLength={100}
        disabled={pending}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-help`}
        className="h-11"
      />
      <TaskTitleHelp id={`${id}-help`} error={error} />
    </FormField>
  )
}
