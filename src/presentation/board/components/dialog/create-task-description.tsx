import { DialogDescription } from "@ui/dialog"

export function CreateTaskDescription() {
  return (
    <DialogDescription className="pt-1 leading-6">
      <span className="block">출시 전에 필요한 일을 기록하세요.</span>
      <span className="block">추가한 체크는 준비 현황에 바로 반영됩니다.</span>
    </DialogDescription>
  )
}
