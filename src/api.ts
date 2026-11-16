import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Board, Task } from "./domain/release";
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${import.meta.env.BASE_URL}api/${path}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(
      error.error || "Unable to reach the workspace. Please try again.",
    );
  }
  return response.json();
}
export const useBoard = () =>
  useQuery({ queryKey: ["board"], queryFn: () => request<Board>("board") });
export function useTaskMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (
      input:
        | { id: string; done: boolean }
        | { title: string; category: Task["category"] },
    ) =>
      "id" in input
        ? request<Task>(`tasks/${input.id}`, {
            method: "PATCH",
            body: JSON.stringify({ done: input.done }),
          })
        : request<Task>("tasks", {
            method: "POST",
            body: JSON.stringify(input),
          }),
    onSuccess: () => client.invalidateQueries({ queryKey: ["board"] }),
  });
}
