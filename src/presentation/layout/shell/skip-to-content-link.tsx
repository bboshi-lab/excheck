import type { MouseEvent, RefObject } from "react"

type SkipToContentLinkProps = {
  target: RefObject<HTMLElement | null>
}

export function SkipToContentLink({ target }: SkipToContentLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    target.current?.focus()
  }

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only z-100 rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      본문으로 건너뛰기
    </a>
  )
}
