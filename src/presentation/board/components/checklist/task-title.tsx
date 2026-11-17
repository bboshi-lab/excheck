type TaskTitleProps = {
  title: string
  done: boolean
}

export function TaskTitle({ title, done }: TaskTitleProps) {
  return (
    <span
      className={`min-w-0 flex-1 wrap-anywhere text-xs leading-6 ${done ? "text-slate-400 line-through decoration-slate-600" : "text-slate-200"}`}
    >
      {title}
    </span>
  )
}
