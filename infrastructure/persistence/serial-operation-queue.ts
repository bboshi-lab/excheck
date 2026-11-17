export class SerialOperationQueue {
  private pending: Promise<void> = Promise.resolve();

  run<Result>(operation: () => Result | Promise<Result>): Promise<Result> {
    const result = this.pending.then(operation);

    // 실패한 한 요청이 다음 요청까지 거절시키지 않도록 큐는 항상 복구한다.
    this.pending = result.then(
      () => undefined,
      () => undefined,
    );

    return result;
  }
}
