import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "../../../ui/button"

export function ActivityHistoryLink() {
  return (
    <Button variant="ghost" asChild className="justify-between px-3 text-[11px] text-muted-foreground">
      <Link to="/activity">
        모든 활동 살펴보기
        <ArrowRight className="size-3" />
      </Link>
    </Button>
  )
}
