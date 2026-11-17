import { execFileSync } from "node:child_process"
import { appendFileSync, readFileSync } from "node:fs"
import { comparisonBase, isDocsOnlyChange, readChangedPaths } from "./change-scope.mjs"

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"))
const base = comparisonBase(process.env.GITHUB_EVENT_NAME, event)
const changedFiles = base ? readChangedPaths((args) => execFileSync("git", args, { encoding: "utf8" }), base) : []
const docsOnly = base !== null && isDocsOnlyChange(changedFiles)

appendFileSync(process.env.GITHUB_OUTPUT, `docs_only=${docsOnly}\n`)
console.info(
  docsOnly
    ? `문서 전용 변경 ${changedFiles.length}개: 앱 검사·배포 생략`
    : "실행 코드 변경 또는 비교 기준 없음: 전체 검사",
)
