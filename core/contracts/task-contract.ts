import { z } from "zod";
import {
  TASK_CATEGORIES,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "../domain/task";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(TASK_TITLE_MIN_LENGTH)
    .max(TASK_TITLE_MAX_LENGTH),
  category: z.enum(TASK_CATEGORIES),
});

export const setTaskDoneSchema = z.object({ done: z.boolean() });

export const taskSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  category: z.enum(TASK_CATEGORIES),
  done: z.boolean(),
});
