import { ChecklistShortcut } from "@presentation/board/components/hero/checklist-shortcut"
import { HeroActionsLayout } from "@presentation/board/components/hero/hero-actions-layout"
import { HeroNextStep } from "@presentation/board/components/hero/hero-next-step"

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
