import { PageDescription } from "./page-description"
import { PageEyebrow } from "./page-eyebrow"
import type { PageHeadingContent } from "./page-heading-content"
import { PageHeadingTextLayout } from "./page-heading-text-layout"
import { PageTitle } from "./page-title"

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
