import { ChecklistShortcut } from "./checklist-shortcut"
import { HeroActionsLayout } from "./hero-actions-layout"
import { HeroNextStep } from "./hero-next-step"

type HeroActionsProps = {
  remaining: number
}

export function HeroActions({ remaining }: HeroActionsProps) {
  return (
    <HeroActionsLayout>
      <ChecklistShortcut />
      <HeroNextStep remaining={remaining} />
    </HeroActionsLayout>
  )
}
