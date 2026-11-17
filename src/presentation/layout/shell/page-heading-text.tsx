import { PageDescription } from "@presentation/layout/shell/page-description"
import { PageEyebrow } from "@presentation/layout/shell/page-eyebrow"
import type { PageHeadingContent } from "@presentation/layout/shell/page-heading-content"
import { PageHeadingTextLayout } from "@presentation/layout/shell/page-heading-text-layout"
import { PageTitle } from "@presentation/layout/shell/page-title"

type PageHeadingTextProps = {
  content: PageHeadingContent
}

export function PageHeadingText({ content }: PageHeadingTextProps) {
  return (
    <PageHeadingTextLayout>
      <PageEyebrow label={content.label} />
      <PageTitle title={content.title} />
      <PageDescription description={content.description} />
    </PageHeadingTextLayout>
  )
}
