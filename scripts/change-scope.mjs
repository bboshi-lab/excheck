import path from "node:path"

export function isDocsOnlyChange(files) {
  if (!files.length) return false

  return files.every((file) => {
    if (
      typeof file !== "string" ||
      /[\\\r\n]/.test(file) ||
      path.posix.isAbsolute(file) ||
      path.posix.normalize(file) !== file ||
      file.startsWith("../")
    ) {
      return false
    }

    return (
      file === "README.md" ||
      /(?:^|\/)AGENTS\.md$/.test(file) ||
      (file.startsWith("docs/") && file.endsWith(".md")) ||
      /^\.agents\/skills\/.+\/SKILL\.md$/.test(file)
    )
  })
}

export function comparisonBase(eventName, event) {
  const candidate =
    eventName === "pull_request" ? event.pull_request?.base?.sha : eventName === "push" ? event.before : null

  if (typeof candidate !== "string" || !/^[a-f\d]{40}(?:[a-f\d]{24})?$/i.test(candidate) || /^0+$/.test(candidate)) {
    return null
  }

  return candidate
}

export function readChangedPaths(runGit, base) {
  return runGit(["diff", "--name-only", "--no-renames", "-z", base, "HEAD", "--"]).split("\0").filter(Boolean)
}
