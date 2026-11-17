import { DemoResetMessage } from "./demo-reset-message"
import { DemoEncouragement } from "./demo-encouragement"

export function DemoResetNotice() {
  return (
    <div
      data-entrance
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/2 px-5 py-4 text-[11px] text-muted-foreground"
    >
      <DemoResetMessage />
      <DemoEncouragement />
    </div>
  )
}
