import { describe, expect, it } from "vitest";
import { BoardService } from "../../core/application/board-service";
import type { Board } from "../../core/domain/board";
import { createDemoBoard } from "../../core/fixtures/create-demo-board";
import { DurableBoardRepository } from "../../worker/infrastructure/durable-board-repository";
import { systemBoardRuntime } from "../runtime/system-board-runtime";
import { createBoardApi } from "./create-board-api";

describe("HTTP 저장 오류 경계", () => {
  it("저장 실패의 내부 내용을 노출하지 않고 재시도를 허용한다", async () => {
    let failWrite = true;
    let saved: Board | undefined;
    const repository = new DurableBoardRepository(
      {
        read: async () => saved,
        write: async (board) => {
          if (failWrite) throw new Error("Internal storage detail");
          saved = structuredClone(board);
        },
      },
      createDemoBoard,
    );
    const api = createBoardApi(
      new BoardService(repository, systemBoardRuntime),
    );
    const post = () =>
      api.request("/api/tasks", {
        method: "POST",
        body: '{"title":"Release notes","category":"Design"}',
      });

    const failure = await post();
    expect(failure.status).toBe(500);
    expect(await failure.json()).toEqual({
      error: "Unable to update the workspace.",
    });
    expect(await repository.read()).toEqual(createDemoBoard());
    failWrite = false;
    expect((await post()).status).toBe(201);
    expect((await repository.read()).tasks).toHaveLength(7);
  });
});
