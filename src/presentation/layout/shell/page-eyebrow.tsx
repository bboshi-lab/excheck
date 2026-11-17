type PageEyebrowProps = {
  label: string
}

export function PageEyebrow({ label }: PageEyebrowProps) {
  return <p className="mb-3 text-[9px] tracking-[0.18em] text-primary/75">출시 관제 / {label}</p>
}
