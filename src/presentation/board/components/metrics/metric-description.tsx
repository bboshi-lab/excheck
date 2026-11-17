type MetricDescriptionProps = {
  description: string
}

export function MetricDescription({ description }: MetricDescriptionProps) {
  return <p className="mt-2 hidden text-[11px] leading-5 text-muted-foreground sm:block">{description}</p>
}
