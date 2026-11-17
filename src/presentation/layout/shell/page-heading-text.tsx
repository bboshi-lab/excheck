import type { PageHeadingContent } from "./page-heading-content"
import { PageEyebrow } from "./page-eyebrow"
import { PageTitle } from "./page-title"
import { PageDescription } from "./page-description"

type PageHeadingTextProps = {
  content: PageHeadingContent
}

export function PageHeadingText({ content }: PageHeadingTextProps) {
  return (
    <div>
      <PageEyebrow label={content.label} />
      <PageTitle title={content.title} />
      <PageDescription description={content.description} />
    </div>
  )
}
