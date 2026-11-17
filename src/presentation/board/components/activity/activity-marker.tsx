import { ArrowDownRight } from "lucide-react"

type ActivityMarkerProps = {
  latest: boolean
}

export function ActivityMarker({ latest }: ActivityMarkerProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${latest ? "bg-primary/12 text-primary" : "bg-muted/70 text-muted-foreground"}`}
    >
      <ArrowDownRight className="size-3.5" />
    </span>
  )
}
