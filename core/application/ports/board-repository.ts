import type { Board } from "@core/domain/board"

export type BoardRepository = {
  read(): Promise<Board>
  // 어댑터는 격리된 초안에 동기 변경을 적용하고 성공한 변경만 원자적으로 저장한다.
  update<Result>(change: (draft: Board) => Result): Promise<Result>
}
