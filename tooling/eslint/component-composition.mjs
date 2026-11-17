import { componentDeclarations, walkAst } from "./component-ast.mjs"
import { relativeProjectPath, resolveProjectImport } from "./project-paths.mjs"

export const componentComposition = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: { composition: "상위 조합은 역할별 컴포넌트로 작성하고 HTML은 명명된 레이아웃·말단으로 분리하세요." },
  },
  create(context) {
    return {
      Program(program) {
        const localNames = new Set(
          program.body
            .filter((node) => node.type === "ImportDeclaration")
            .flatMap((node) => {
              const target = resolveProjectImport(node.source.value, context.filename)
              const relative = target ? relativeProjectPath(target) : ""

              if (!relative.startsWith("src/presentation/") || relative.startsWith("src/presentation/ui/")) return []

              return node.specifiers.map((specifier) => specifier.local.name)
            }),
        )

        for (const { declaration, name } of componentDeclarations(program)) {
          const markup = []
          let hasLocalChild = false

          walkAst(declaration.body, (node) => {
            if (node.type !== "JSXOpeningElement" || node.name.type !== "JSXIdentifier") return

            if (/^[a-z]/.test(node.name.name)) markup.push(node)
            if (localNames.has(node.name.name)) hasLocalChild = true
          })

          if (markup.length && (hasLocalChild || /(?:View|Page|Shell)$/.test(name))) {
            context.report({ node: markup[0], messageId: "composition" })
          }
        }
      },
    }
  },
}
