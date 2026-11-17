import { Link } from "react-router"
import { ArrowLeft, Orbit } from "lucide-react"
import { Button } from "../ui/button"

export function NotFoundPage() {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center gap-5 text-center">
      <Orbit className="size-12 text-primary" />
      <h2 className="text-xl font-semibold">잠시 궤도를 벗어났네요.</h2>
      <p className="text-sm text-muted-foreground">요청한 페이지를 찾을 수 없습니다.</p>
      <Button asChild>
        <Link to="/">
          <ArrowLeft />
          대시보드로 돌아가기
        </Link>
      </Button>
    </section>
  )
}
