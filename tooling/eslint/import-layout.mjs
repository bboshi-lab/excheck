import { hasCommentedImportLayout } from "./commented-imports.mjs"
import { resolveProjectImport } from "./project-paths.mjs"

export const importLayout = {
  meta: {
    type: "layout",
    fixable: "code",
    schema: [],
    messages: { layout: "import를 외부·프로젝트 순서로 정렬하고, 한 개짜리 그룹은 빈 줄 없이 합치세요." },
  },
  create(context) {
    return {
      Program(program) {
        const imports = program.body.filter((node) => node.type === "ImportDeclaration")

        if (imports.length < 2) return

        const source = context.sourceCode
        const first = imports[0]
        const last = imports.at(-1)
        const inside = program.body.filter((node) => node.range[0] >= first.range[0] && node.range[1] <= last.range[1])

        if (inside.length !== imports.length) {
          context.report({ node: first, messageId: "layout" })
          return
        }

        const entries = imports.map((node, index) => ({
          node,
          index,
          group: node.source.value.startsWith(".") || resolveProjectImport(node.source.value, context.filename) ? 1 : 0,
          text: source.getText(node),
        }))
        const sideEffects = entries.filter(({ node }) => node.specifiers.length === 0)
        const ordered = []
        let chunk = []
        const flush = () => {
          ordered.push(
            ...chunk.sort(
              (left, right) =>
                left.group - right.group ||
                left.node.source.value.localeCompare(right.node.source.value, "en") ||
                left.index - right.index,
            ),
          )
          chunk = []
        }

        // 부수 효과 import를 경계로 삼아 초기화 순서를 바꾸지 않는다.
        for (const entry of entries) {
          if (entry.node.specifiers.length === 0) {
            flush()
            ordered.push(entry)
          } else {
            chunk.push(entry)
          }
        }
        flush()

        const counts = [0, 0]
        entries.forEach((entry) => counts[entry.group]++)
        const separateGroups = counts.every((count) => count >= 2) && sideEffects.length === 0
        const expected = ordered
          .map((entry, index) => {
            const separator =
              index && separateGroups && entry.group !== ordered[index - 1].group ? "\n\n" : index ? "\n" : ""

            return separator + entry.text
          })
          .join("")
        const range = [first.range[0], last.range[1]]

        if (source.text.slice(...range) === expected) return

        const hasComments = source
          .getAllComments()
          .some((comment) => comment.range[0] >= range[0] && comment.range[1] <= range[1])

        if (hasComments && hasCommentedImportLayout(entries, ordered, source, separateGroups)) return

        context.report({
          node: first,
          messageId: "layout",
          fix: hasComments ? null : (fixer) => fixer.replaceTextRange(range, expected),
        })
      },
    }
  },
}
