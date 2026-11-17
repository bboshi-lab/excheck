import { Layers2 } from "lucide-react"
import { Link } from "react-router"

export function Brand() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Launchboard 홈">
      <span className="grid size-9 place-items-center rounded-xl border border-primary/20 bg-primary/12 text-primary">
        <Layers2 className="size-5" strokeWidth={1.7} />
      </span>
      <span className="text-xl font-semibold tracking-[-0.06em]">
        launchboard<span className="text-primary">.</span>
      </span>
    </Link>
  )
}
