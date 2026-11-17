import { Link } from "react-router"
import { BrandMark } from "@presentation/layout/navigation/brand-mark"
import { BrandWordmark } from "@presentation/layout/navigation/brand-wordmark"

export function Brand() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Launchboard 홈">
      <BrandMark />
      <BrandWordmark />
    </Link>
  )
}
