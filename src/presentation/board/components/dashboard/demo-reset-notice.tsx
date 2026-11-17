import { DemoEncouragement } from "@presentation/board/components/dashboard/demo-encouragement"
import { DemoResetMessage } from "@presentation/board/components/dashboard/demo-reset-message"
import { DemoResetNoticeLayout } from "@presentation/board/components/dashboard/demo-reset-notice-layout"

export function DemoResetNotice() {
  return (
    <DemoResetNoticeLayout>
      <DemoResetMessage />
      <DemoEncouragement />
    </DemoResetNoticeLayout>
  )
}
