type TaskTitleHelpProps = {
  id: string
  error: string | null
}

export function TaskTitleHelp({ id, error }: TaskTitleHelpProps) {
  return (
    <p
      id={id}
      role={error ? "alert" : undefined}
      className={`text-xs leading-5 ${error ? "text-destructive" : "text-muted-foreground"}`}
    >
      {error || "양끝 공백을 제외한 3~100자. 팀이 이해할 수 있는 구체적인 이름이면 좋아요."}
    </p>
  )
}
