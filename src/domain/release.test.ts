import { describe, it, expect } from "vitest";
import { readiness, seed, TaskInput } from "./release";
describe("release readiness", () => {
  it("does not report an empty release as ready", () =>
    expect(readiness([])).toEqual({ complete: 0, total: 0, percent: 0 }));
  it("calculates actual completed checks", () =>
    expect(readiness(seed().tasks)).toEqual({
      complete: 3,
      total: 6,
      percent: 50,
    }));
  it("rejects empty, oversized and invalid category input", () => {
    for (const input of [
      { title: "   ", category: "Design" },
      { title: "x".repeat(101), category: "Design" },
      { title: "Valid title", category: "Other" },
    ])
      expect(TaskInput.safeParse(input).success).toBe(false);
  });
});
