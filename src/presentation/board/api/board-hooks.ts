import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { CreateTaskInput } from "../../../../core/domain/task"

import { useBoardGateway } from "../context/board-gateway-provider"

const boardQueryKey = ["board"] as const

export function useBoard() {
  const gateway = useBoardGateway()

  return useQuery({ queryKey: boardQueryKey, queryFn: () => gateway.getBoard() })
}

export function useCreateTask() {
  const gateway = useBoardGateway()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTaskInput) => gateway.createTask(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: boardQueryKey }),
  })
}

export function useSetTaskDone() {
  const gateway = useBoardGateway()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, done }: { id: string; done: boolean }) => gateway.setTaskDone(id, done),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: boardQueryKey }),
  })
}
