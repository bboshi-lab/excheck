import type { Board } from "@core/domain/board"

export function createDemoBoard(): Board {
  return {
    tasks: [
      {
        id: "1",
        title: "인증 및 권한 점검",
        category: "Engineering",
        done: true,
      },
      {
        id: "2",
        title: "반응형 화면 검토",
        category: "Design",
        done: true,
      },
      {
        id: "3",
        title: "오류 모니터링과 알림 설정",
        category: "Operations",
        done: false,
      },
      {
        id: "4",
        title: "키보드·스크린 리더 점검",
        category: "Design",
        done: false,
      },
      {
        id: "5",
        title: "API 계약 검증",
        category: "Engineering",
        done: true,
      },
      {
        id: "6",
        title: "롤백 절차 문서화",
        category: "Operations",
        done: false,
      },
    ],
    activity: [
      {
        id: "seed",
        message: "워크스페이스를 만들었습니다. 좋은 출시의 첫걸음이에요.",
        at: "2026-11-16T09:00:00Z",
      },
    ],
  }
}
