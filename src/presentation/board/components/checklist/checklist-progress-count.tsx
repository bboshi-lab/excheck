import type { Readiness } from "@core/domain/readiness"

type ChecklistProgressCountProps = {
  readiness: Readiness
}

export function ChecklistProgressCount({ readiness }: ChecklistProgressCountProps) {
  return (
    <span>
      {readiness.complete} / {readiness.total} 완료
    </span>
  )
}
