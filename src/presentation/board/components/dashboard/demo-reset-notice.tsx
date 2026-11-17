import { DemoEncouragement } from "./demo-encouragement"
import { DemoResetMessage } from "./demo-reset-message"
import { DemoResetNoticeLayout } from "./demo-reset-notice-layout"

export function DemoResetNotice() {
  return (
    <DemoResetNoticeLayout>
      <DemoResetMessage />
      <DemoEncouragement />
    </DemoResetNoticeLayout>
  )
}
