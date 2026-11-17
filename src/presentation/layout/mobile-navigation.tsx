import { useState } from "react"

import { Sheet, SheetContent } from "../ui/sheet"

import { MobileMenuHeader } from "./navigation/mobile-menu-header"
import { MobileMenuLinks } from "./navigation/mobile-menu-links"
import { MobileMenuTrigger } from "./navigation/mobile-menu-trigger"

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
