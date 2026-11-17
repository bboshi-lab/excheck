import { Link } from "react-router"
import { ArrowUpRight } from "lucide-react"
import { Button } from "../../../ui/button"

export function ChecklistShortcut() {
  return (
    <Button asChild className="shadow-lg shadow-violet-500/10">
      <Link to="/checks">
        체크리스트 살펴보기
        <ArrowUpRight />
      </Link>
    </Button>
  )
}
