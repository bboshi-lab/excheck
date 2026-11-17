import { useAnimatedNumber } from "@presentation/hooks/use-animated-number"

type ReadinessNumberProps = {
  percent: number
}

export function ReadinessNumber({ percent }: ReadinessNumberProps) {
  const displayed = useAnimatedNumber(percent)

  return (
    <strong className="metric-number text-5xl font-semibold sm:text-6xl">
      {displayed}
      <span className="ml-1 text-xl font-normal text-primary">%</span>
    </strong>
  )
}
