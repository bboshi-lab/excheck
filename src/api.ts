import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateTaskInput } from "../core/domain/task"
import { createBoardHttpClient } from "./infrastructure/http/board-http-client"

type TaskMutation = CreateTaskInput | { id: string; done: boolean }

const boardClient = createBoardHttpClient(`${import.meta.env.BASE_URL}api/`)

export function useBoard() {
  return useQuery({ queryKey: ["board"], queryFn: boardClient.getBoard })
}

export function useTaskMutation() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: (input: TaskMutation) =>
      "id" in input ? boardClient.setTaskDone(input.id, input.done) : boardClient.createTask(input),
    onSuccess: () => client.invalidateQueries({ queryKey: ["board"] }),
  })
}
