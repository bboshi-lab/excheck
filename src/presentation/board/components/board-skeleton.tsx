import { Skeleton } from "../../ui/skeleton"

export function BoardSkeleton() {
  return (
    <div role="status" aria-label="보드를 불러오는 중" className="space-y-5">
      <Skeleton className="h-75 w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => (
          <Skeleton key={index} className="h-36 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-100 w-full rounded-xl" />
      <span className="sr-only">보드를 불러오는 중입니다.</span>
    </div>
  )
}
