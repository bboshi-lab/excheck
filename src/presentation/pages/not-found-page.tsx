import { NotFoundDescription } from "@presentation/pages/not-found/not-found-description"
import { NotFoundIcon } from "@presentation/pages/not-found/not-found-icon"
import { NotFoundLayout } from "@presentation/pages/not-found/not-found-layout"
import { NotFoundTitle } from "@presentation/pages/not-found/not-found-title"
import { ReturnToDashboardLink } from "@presentation/pages/not-found/return-to-dashboard-link"

export function NotFoundPage() {
  return (
    <NotFoundLayout>
      <NotFoundIcon />
      <NotFoundTitle />
      <NotFoundDescription />
      <ReturnToDashboardLink />
    </NotFoundLayout>
  )
}
