import { Skeleton } from "../../../ui/skeleton"

export function BoardMetricsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[0, 1, 2].map((index) => (
        <Skeleton key={index} className="h-36 rounded-xl" />
      ))}
    </div>
  )
}
