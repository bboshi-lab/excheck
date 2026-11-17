import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtempSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { test } from "node:test"
import { comparisonBase, isDocsOnlyChange, readChangedPaths } from "./change-scope.mjs"

for (const files of [
  ["README.md"],
  ["AGENTS.md", ".agents/skills/react-conventions/SKILL.md"],
  ["docs/설계 문서.md"],
]) {
  test(`문서만 변경: ${files.join(", ")}`, () => assert.equal(isDocsOnlyChange(files), true))
}

for (const files of [
  [],
  ["README.md", "package.json"],
  ["docs/설계.md", "src/main.tsx"],
  [".agents/skills/react-conventions/check.mjs"],
  ["docs/preview.png"],
  [".github/workflows/ci.yml"],
  ["docs/../src/example.md"],
  ["/tmp/AGENTS.md"],
  ["../AGENTS.md"],
  ["src/unrecognized.md"],
]) {
  test(`전체 검사가 필요한 변경: ${JSON.stringify(files)}`, () => assert.equal(isDocsOnlyChange(files), false))
}

test("PR은 base SHA, push는 before SHA를 사용한다", () => {
  const base = "a".repeat(40)

  assert.equal(comparisonBase("pull_request", { pull_request: { base: { sha: base } } }), base)
  assert.equal(comparisonBase("push", { before: base }), base)
})

test("최초 push·수동 실행·잘못된 이벤트는 전체 검사한다", () => {
  assert.equal(comparisonBase("push", { before: "0".repeat(40) }), null)
  assert.equal(comparisonBase("workflow_dispatch", {}), null)
  assert.equal(comparisonBase("pull_request", {}), null)
  assert.equal(comparisonBase("push", { before: "--malicious-option" }), null)
})

test("코드를 문서로 이름 바꿔도 삭제된 실행 파일을 포함해 전체 검사한다", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "excheck-change-scope-"))
  const git = (args) => execFileSync("git", args, { cwd: directory, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] })
  const commit = (message) =>
    git(["-c", "user.name=검증", "-c", "user.email=test@example.invalid", "commit", "-qm", message])

  try {
    git(["init", "-q"])
    mkdirSync(path.join(directory, "src"))
    mkdirSync(path.join(directory, "docs"))
    writeFileSync(path.join(directory, "src", "old.js"), "export const value = 1\n")
    git(["add", "."])
    commit("initial")
    const base = git(["rev-parse", "HEAD"]).trim()

    renameSync(path.join(directory, "src", "old.js"), path.join(directory, "docs", "새 문서.md"))
    git(["add", "-A"])
    commit("rename")

    const files = readChangedPaths(git, base)

    assert.deepEqual(files.sort(), ["docs/새 문서.md", "src/old.js"])
    assert.equal(isDocsOnlyChange(files), false)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
