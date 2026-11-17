import type { Board } from "../../domain/board";
import type { CreateTaskInput, Task } from "../../domain/task";

export type BoardGateway = {
  getBoard(): Promise<Board>;
  createTask(input: CreateTaskInput): Promise<Task>;
  setTaskDone(id: string, done: boolean): Promise<Task>;
};
