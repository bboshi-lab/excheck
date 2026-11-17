type BoardErrorMessageProps = {
  message: string
}

export function BoardErrorMessage({ message }: BoardErrorMessageProps) {
  return <p className="mb-6 mt-3 max-w-md text-sm leading-7 text-muted-foreground">{message}</p>
}
