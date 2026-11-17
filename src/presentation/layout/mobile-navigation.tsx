import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { AppNavigation } from "./app-navigation"
import { Brand } from "./brand"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)

  const handleNavigate = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="메뉴 열기">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-white/10 bg-background">
        <SheetHeader className="px-5 pb-6 pt-12">
          <SheetTitle>
            <Brand />
          </SheetTitle>
          <SheetDescription>프로젝트 아틀라스의 출시 준비 공간</SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <AppNavigation onNavigate={handleNavigate} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
