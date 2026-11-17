import { ESLint } from "eslint"
import assert from "node:assert/strict"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import { test } from "node:test"
import { projectRoot } from "./project-paths.mjs"

test("실제 ESLint 구성에서 별칭으로 연결된 순환 의존을 차단한다", async () => {
  const directory = mkdtempSync(path.join(projectRoot, "src/shared/quality-fixture-"))
  const alias = `@shared/${path.basename(directory)}`

  try {
    writeFileSync(
      path.join(directory, "a.ts"),
      `import { readB } from "${alias}/b"\nexport function readA(): number { return readB() }\n`,
    )
    writeFileSync(
      path.join(directory, "b.ts"),
      `import { readA } from "${alias}/a"\nexport function readB(): number { return readA() }\n`,
    )

    const eslint = new ESLint({ cwd: projectRoot })
    const results = await eslint.lintFiles([path.join(directory, "a.ts"), path.join(directory, "b.ts")])

    assert.ok(
      results.some((result) => result.messages.some((message) => message.ruleId === "import-x/no-cycle")),
      JSON.stringify(
        results.map(({ filePath, messages }) => ({ filePath, messages })),
        null,
        2,
      ),
    )
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
