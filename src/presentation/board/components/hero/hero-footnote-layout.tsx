import type { ReactNode } from "react"

type HeroFootnoteLayoutProps = {
  children: ReactNode
}

export function HeroFootnoteLayout({ children }: HeroFootnoteLayoutProps) {
  return (
    <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/7 pt-4 text-[10px] text-slate-400">
      {children}
    </div>
  )
}
