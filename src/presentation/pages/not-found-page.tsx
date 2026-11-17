import { NotFoundLayout } from "./not-found/not-found-layout"
import { NotFoundIcon } from "./not-found/not-found-icon"
import { NotFoundTitle } from "./not-found/not-found-title"
import { NotFoundDescription } from "./not-found/not-found-description"
import { ReturnToDashboardLink } from "./not-found/return-to-dashboard-link"

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
