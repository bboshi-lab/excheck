import { Activity, LayoutDashboard, ListChecks } from "lucide-react"
import { NavLink } from "react-router"
import { cn } from "../../shared/lib/utils"

const navigation = [
  { path: "/", label: "대시보드", icon: LayoutDashboard, index: "01" },
  { path: "/checks", label: "출시 체크리스트", icon: ListChecks, index: "02" },
  { path: "/activity", label: "활동 타임라인", icon: Activity, index: "03" },
] as const

type AppNavigationProps = {
  onNavigate?: () => void
}

export function AppNavigation({ onNavigate }: AppNavigationProps) {
  return (
    <nav aria-label="주 메뉴" className="grid gap-1.5">
      {navigation.map(({ path, label, icon: Icon, index }) => (
        <NavLink
          key={path}
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
          <span>{label}</span>
          <span className="ml-auto text-[9px] opacity-40" aria-hidden="true">
            {index}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}
