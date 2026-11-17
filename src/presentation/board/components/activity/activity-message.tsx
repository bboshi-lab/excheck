type ActivityMessageProps = {
  message: string
}

export function ActivityMessage({ message }: ActivityMessageProps) {
  return <p className="wrap-anywhere text-xs leading-6 text-slate-300">{message}</p>
}
