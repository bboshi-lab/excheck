import { InlineError } from "../../../components/inline-error"

type TaskMutationErrorProps = {
  error: string | null
}

export function TaskMutationError({ error }: TaskMutationErrorProps) {
  return <InlineError message={error} className="ml-7.5 mt-2" />
}
