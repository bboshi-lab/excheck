import { Badge } from "@ui/badge"

type ChecklistTitleProps = {
  count: number
}

export function ChecklistTitle({ count }: ChecklistTitleProps) {
  return (
    <span className="flex items-center gap-2">
      출시 체크리스트
      <Badge variant="secondary" className="rounded-md text-[10px] font-normal">
        {count}
      </Badge>
    </span>
  )
}
