type CategoryLegendKeyProps = {
  label: string
  complete?: boolean
}

export function CategoryLegendKey({ label, complete = false }: CategoryLegendKeyProps) {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${complete ? "bg-chart-1" : "bg-muted"}`} />
      {label}
    </span>
  )
}
