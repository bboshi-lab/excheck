import { cn } from "../../shared/lib/utils"

type InlineErrorProps = {
  message: string | null
  className?: string
}

export function InlineError({ message, className }: InlineErrorProps) {
  if (!message) return null

  return (
    <p role="alert" className={cn("text-xs leading-6 text-destructive", className)}>
      {message}
    </p>
  )
}
