import { useAnimatedNumber } from "@presentation/hooks/use-animated-number"

type MetricValueProps = {
  value: number
}

export function MetricValue({ value }: MetricValueProps) {
  const displayed = useAnimatedNumber(value)

  return (
    <p className="metric-number mt-3 text-3xl font-semibold sm:mt-2 sm:text-4xl">
      <span aria-hidden="true">{String(displayed).padStart(2, "0")}</span>
    </p>
  )
}
