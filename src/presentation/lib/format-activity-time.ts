const formatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export function formatActivityTime(isoTime: string): string {
  return formatter.format(new Date(isoTime))
}
