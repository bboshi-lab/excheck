import { Route, Routes } from "react-router"
import { AppShell } from "../presentation/layout/app-shell"
import { DashboardPage } from "../presentation/pages/dashboard-page"
import { ChecklistPage } from "../presentation/pages/checklist-page"
import { ActivityPage } from "../presentation/pages/activity-page"
import { NotFoundPage } from "../presentation/pages/not-found-page"

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="checks" element={<ChecklistPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
