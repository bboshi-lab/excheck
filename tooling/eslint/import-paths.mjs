import { canonicalImportPath, moduleVisitors } from "./project-paths.mjs"

export const importPaths = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
    messages: { alias: "프로젝트 import는 '{{path}}' 별칭을 사용하세요." },
  },
  create(context) {
    return moduleVisitors((node) => {
      if (typeof node.value !== "string") return

      const canonical = canonicalImportPath(node.value, context.filename)

      if (!canonical || canonical === node.value) return

      context.report({
        node,
        messageId: "alias",
        data: { path: canonical },
        fix: (fixer) => fixer.replaceText(node, JSON.stringify(canonical)),
      })
    })
  },
}
