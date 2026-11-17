import { ChecklistShortcut } from "./checklist-shortcut"
import { HeroNextStep } from "./hero-next-step"

type HeroActionsProps = {
  remaining: number
}

export function HeroActions({ remaining }: HeroActionsProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <ChecklistShortcut />
      <HeroNextStep remaining={remaining} />
    </div>
  )
}
