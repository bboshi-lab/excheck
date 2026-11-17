import { useLocation } from "react-router"
import { pageHeadings, missingPageHeading } from "@presentation/layout/shell/page-heading-content"
import { PageHeadingLayout } from "@presentation/layout/shell/page-heading-layout"
import { PageHeadingText } from "@presentation/layout/shell/page-heading-text"
import { ProjectVersionBadge } from "@presentation/layout/shell/project-version-badge"

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
