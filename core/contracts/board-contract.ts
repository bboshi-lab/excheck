import { z } from "zod"
import { taskSchema } from "./task-contract"

export const boardSchema = z.object({
  tasks: z.array(taskSchema),
  activity: z.array(
    z.object({
      id: z.string().min(1),
      message: z.string(),
      at: z.iso.datetime(),
    }),
  ),
})

export const apiErrorSchema = z.object({ error: z.string() })
