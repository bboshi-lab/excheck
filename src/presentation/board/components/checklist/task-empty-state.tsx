import { ListChecks } from "lucide-react"

export function TaskEmptyState() {
  return (
    <div className="flex flex-col items-center px-5 py-14 text-center">
      <ListChecks className="mb-4 size-7 text-muted-foreground" />
      <h3 className="text-sm font-medium">아직 등록된 체크가 없어요.</h3>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">첫 체크를 추가하고 출시 준비를 시작해 보세요.</p>
    </div>
  )
}
