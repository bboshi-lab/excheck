import type { LucideIcon } from "lucide-react"
import { NavLink } from "react-router"

import { cn } from "../../../shared/lib/utils"

import { NavigationIndex } from "./navigation-index"
import { NavigationLabel } from "./navigation-label"

type NavigationItemProps = {
  path: string
  label: string
  icon: LucideIcon
  index: string
  onNavigate?: () => void
}

export function NavigationItem({ path, label, icon: Icon, index, onNavigate }: NavigationItemProps) {
  return (
    <NavLink
      to={path}
      end={path === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-lg border px-3 py-3 text-[13px] transition-colors",
          isActive
            ? "border-primary/15 bg-primary/10 text-violet-200"
            : "border-transparent text-muted-foreground hover:bg-white/4 hover:text-foreground",
        )
      }
    >
      <Icon className="size-4" strokeWidth={1.7} />
      <NavigationLabel label={label} />
      <NavigationIndex index={index} />
    </NavLink>
  )
}
