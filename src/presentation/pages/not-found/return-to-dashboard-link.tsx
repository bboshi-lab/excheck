import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../ui/button"

export function ReturnToDashboardLink() {
  return (
    <Button asChild>
      <Link to="/">
        <ArrowLeft />
        대시보드로 돌아가기
      </Link>
    </Button>
  )
}
