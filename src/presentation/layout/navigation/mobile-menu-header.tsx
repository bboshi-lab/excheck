import { SheetHeader, SheetTitle, SheetDescription } from "../../ui/sheet"

import { Brand } from "../brand"

export function MobileMenuHeader() {
  return (
    <SheetHeader className="px-5 pb-6 pt-12">
      <SheetTitle>
        <Brand />
      </SheetTitle>
      <SheetDescription>프로젝트 아틀라스의 출시 준비 공간</SheetDescription>
    </SheetHeader>
  )
}
