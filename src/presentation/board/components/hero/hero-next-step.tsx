import { Orbit } from "lucide-react"

type HeroNextStepProps = {
  remaining: number
}

export function HeroNextStep({ remaining }: HeroNextStepProps) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Orbit className="size-3.5" />
      {remaining}개의 다음 한 걸음
    </span>
  )
}
