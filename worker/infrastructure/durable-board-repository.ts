import type { BoardRepository } from "../../core/application/ports/board-repository";
import type { Board } from "../../core/domain/board";
import { SerialOperationQueue } from "../../infrastructure/persistence/serial-operation-queue";

export type BoardSnapshotStorage = {
  read(): Promise<Board | undefined>;
  write(board: Board): Promise<void>;
};

export class DurableBoardRepository implements BoardRepository {
  private readonly queue = new SerialOperationQueue();

  constructor(
    private readonly storage: BoardSnapshotStorage,
    private readonly createInitialBoard: () => Board,
  ) {}

  read(): Promise<Board> {
    return this.queue.run(async () =>
      structuredClone((await this.storage.read()) ?? this.createInitialBoard()),
    );
  }

  update<Result>(change: (draft: Board) => Result): Promise<Result> {
    return this.queue.run(async () => {
      const draft = structuredClone(
        (await this.storage.read()) ?? this.createInitialBoard(),
      );
      const result = structuredClone(change(draft));

      await this.storage.write(draft);

      return result;
    });
  }
}
