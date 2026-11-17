export class TaskNotFoundError extends Error {
  constructor() {
    super("체크 항목을 찾을 수 없습니다.")

    this.name = "TaskNotFoundError"
  }
}
