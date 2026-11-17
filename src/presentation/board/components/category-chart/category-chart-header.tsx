import { ChartNoAxesCombined } from "lucide-react"
import { PanelHeading } from "@presentation/components/panel-heading"

export function CategoryChartHeader() {
  return (
    <PanelHeading
      eyebrow="분야별 진행 상황"
      title="분야별 준비 현황"
      action={<ChartNoAxesCombined className="size-4 text-muted-foreground" />}
    />
  )
}
