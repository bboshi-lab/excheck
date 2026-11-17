import type { TaskCategory } from "../../../core/domain/task"

export const categoryLabels: Record<TaskCategory, string> = {
  Engineering: "개발",
  Design: "디자인",
  Operations: "운영",
}

export const categoryColors: Record<TaskCategory, string> = {
  Engineering: "var(--chart-1)",
  Design: "var(--chart-2)",
  Operations: "var(--chart-3)",
}

export const categoryBadgeClasses: Record<TaskCategory, string> = {
  Engineering: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  Design: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  Operations: "border-amber-400/20 bg-amber-400/10 text-amber-300",
}
