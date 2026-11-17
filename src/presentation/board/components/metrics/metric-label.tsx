type MetricLabelProps = {
  label: string
}

export function MetricLabel({ label }: MetricLabelProps) {
  return <h2 className="text-[11px] font-medium text-muted-foreground sm:text-xs">{label}</h2>
}
