import { describe, expect, it } from "vitest";
import type { Board } from "../../core/domain/board";
import { createDemoBoard } from "../../core/fixtures/create-demo-board";
import {
  DurableBoardRepository,
  type BoardSnapshotStorage,
} from "./durable-board-repository";

function createStorage(): BoardSnapshotStorage {
  let saved: Board | undefined;

  return {
    read: async () => saved,
    write: async (board) => {
      saved = structuredClone(board);
    },
  };
}

describe("영속 보드 저장소 어댑터", () => {
  it("어댑터를 재생성해도 이전 저장 내용을 읽는다", async () => {
    const storage = createStorage();
    const first = new DurableBoardRepository(storage, createDemoBoard);
    await first.update((board) => {
      board.tasks[0].title = "Persisted title";
    });
    const restarted = new DurableBoardRepository(storage, createDemoBoard);

    expect((await restarted.read()).tasks[0].title).toBe("Persisted title");
  });

  it("초안을 수정한 뒤 실패해도 저장된 보드는 오염되지 않는다", async () => {
    const repository = new DurableBoardRepository(
      createStorage(),
      createDemoBoard,
    );
    await repository.update(() => undefined);

    await expect(
      repository.update((board) => {
        board.tasks.length = 0;
        throw new Error("취소된 변경");
      }),
    ).rejects.toThrow("취소된 변경");
    expect(await repository.read()).toEqual(createDemoBoard());
  });

  it("저장이 실패해도 다음 요청이 정상적으로 진행된다", async () => {
    const persisted = createStorage();
    let failNext = true;
    const repository = new DurableBoardRepository(
      {
        read: persisted.read,
        write: async (board) => {
          if (failNext) {
            failNext = false;
            throw new Error("저장 실패");
          }
          await persisted.write(board);
        },
      },
      createDemoBoard,
    );

    await expect(
      repository.update((board) => {
        board.tasks.length = 0;
      }),
    ).rejects.toThrow("저장 실패");
    expect(await repository.read()).toEqual(createDemoBoard());
    await repository.update((board) => {
      board.tasks[0].done = false;
    });
    expect((await repository.read()).tasks[0].done).toBe(false);
  });

  it("조회도 앞서 시작한 저장이 끝난 뒤의 상태를 반환한다", async () => {
    const persisted = createStorage();
    let releaseWrite: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => {
      releaseWrite = resolve;
    });
    const repository = new DurableBoardRepository(
      {
        read: persisted.read,
        write: async (board) => {
          await gate;
          await persisted.write(board);
        },
      },
      createDemoBoard,
    );

    const update = repository.update((board) => {
      board.tasks[0].title = "After write";
    });
    const read = repository.read();
    releaseWrite();
    await update;

    expect((await read).tasks[0].title).toBe("After write");
  });
});
