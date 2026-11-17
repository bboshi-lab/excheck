import { InlineError } from "../../../components/inline-error"

type TaskFormErrorProps = {
  error: string | null
}

export function TaskFormError({ error }: TaskFormErrorProps) {
  return <InlineError message={error} className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2" />
}
