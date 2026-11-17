export type PageHeadingContent = {
  label: string
  title: string
  description: string
}

export const pageHeadings: Record<string, PageHeadingContent> = {
  "/": {
    label: "대시보드",
    title: "출시의 모든 순간을, 한눈에.",
    description: "팀의 다음 도약을 위한 준비 상황을 확인하세요.",
  },
  "/checks": {
    label: "출시 체크리스트",
    title: "마지막 디테일까지, 빈틈없이.",
    description: "출시 전에 필요한 확인을 한곳에서 관리하세요.",
  },
  "/activity": {
    label: "활동 타임라인",
    title: "작은 변화가 쌓이는 곳.",
    description: "최근 20개의 활동으로 준비 과정을 돌아보세요.",
  },
}

export const missingPageHeading: PageHeadingContent = {
  label: "페이지 없음",
  title: "잠시 길을 잃었네요.",
  description: "대시보드에서 다시 시작해 주세요.",
}
