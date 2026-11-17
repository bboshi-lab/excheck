import { useLocation } from "react-router"
import { pageHeadings, missingPageHeading } from "./page-heading-content"
import { PageHeadingLayout } from "./page-heading-layout"
import { PageHeadingText } from "./page-heading-text"
import { ProjectVersionBadge } from "./project-version-badge"

export function PageHeading() {
  const { pathname } = useLocation()
  const content = pageHeadings[pathname] ?? missingPageHeading

  return (
    <PageHeadingLayout>
      <PageHeadingText content={content} />
      <ProjectVersionBadge />
    </PageHeadingLayout>
  )
}
