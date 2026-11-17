import type { ReactNode, Ref } from "react"

type MainContentProps = {
  children: ReactNode
  ref: Ref<HTMLElement>
}

export function MainContent({ children, ref }: MainContentProps) {
  return (
    <main
      ref={ref}
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-375 px-4 pb-6 pt-7 focus:outline-none sm:px-8 sm:pt-9 xl:px-10"
    >
      {children}
    </main>
  )
}
