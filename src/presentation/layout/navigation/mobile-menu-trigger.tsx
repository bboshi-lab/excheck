import { Menu } from "lucide-react"
import { Button } from "@ui/button"
import { SheetTrigger } from "@ui/sheet"

export function MobileMenuTrigger() {
  return (
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="메뉴 열기">
        <Menu />
      </Button>
    </SheetTrigger>
  )
}
