import { Activity, LayoutDashboard, ListChecks } from "lucide-react"

export const navigationItems = [
  { path: "/", label: "대시보드", icon: LayoutDashboard, index: "01" },
  { path: "/checks", label: "출시 체크리스트", icon: ListChecks, index: "02" },
  { path: "/activity", label: "활동 타임라인", icon: Activity, index: "03" },
] as const
