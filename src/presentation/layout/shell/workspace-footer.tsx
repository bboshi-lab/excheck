import { FooterMotto } from "./footer-motto"
import { FooterSignature } from "./footer-signature"

export function WorkspaceFooter() {
  return (
    <footer className="mt-9 flex flex-wrap items-center justify-between gap-2 border-t border-white/6 pt-5 text-[9px] tracking-wide text-slate-500">
      <FooterMotto />
      <FooterSignature />
    </footer>
  )
}
