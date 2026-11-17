import { useState } from "react"
import { MobileMenuHeader } from "@presentation/layout/navigation/mobile-menu-header"
import { MobileMenuLinks } from "@presentation/layout/navigation/mobile-menu-links"
import { MobileMenuTrigger } from "@presentation/layout/navigation/mobile-menu-trigger"
import { Sheet, SheetContent } from "@ui/sheet"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)

  const handleNavigate = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <MobileMenuTrigger />
      <SheetContent side="left" className="w-72 border-white/10 bg-background">
        <MobileMenuHeader />
        <MobileMenuLinks onNavigate={handleNavigate} />
      </SheetContent>
    </Sheet>
  )
}
