type ActivityRetentionNoteProps = {
  count: number
  compact: boolean
}

export function ActivityRetentionNote({ count, compact }: ActivityRetentionNoteProps) {
  const message = compact && count > 4 ? `전체 ${count}건 중 최신 4건` : "최근 활동은 최대 20건까지 보관됩니다."

  return <p className="mt-5 border-t border-white/5 pt-4 text-[10px] leading-5 text-muted-foreground">{message}</p>
}
