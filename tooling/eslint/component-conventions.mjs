import { componentDeclarations, walkAst } from "./component-ast.mjs"

export const componentConventions = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      declaration: "컴포넌트 '{{name}}'는 정의한 줄에서 export하는 function 선언으로 작성하세요.",
      props: "컴포넌트 바로 위에 type {{name}}Props를 선언하고 매개변수에 사용하세요.",
      single: "직접 작성한 컴포넌트는 한 파일에 하나씩 두세요.",
      arrow: "컴포넌트 내부 함수는 const arrow function으로 작성하세요.",
    },
  },
  create(context) {
    return {
      Program(program) {
        const components = componentDeclarations(program)

        for (const component of components) {
          const { declaration, statement, index, name } = component

          if (
            declaration.type !== "FunctionDeclaration" ||
            !declaration.id?.name ||
            !["ExportNamedDeclaration", "ExportDefaultDeclaration"].includes(statement.type)
          ) {
            context.report({ node: declaration, messageId: "declaration", data: { name } })
          }
          if (components.indexOf(component) > 0) context.report({ node: declaration, messageId: "single" })

          if (declaration.params.length) {
            const previous = program.body[index - 1]?.declaration ?? program.body[index - 1]
            const parameter =
              declaration.params[0].type === "AssignmentPattern" ? declaration.params[0].left : declaration.params[0]
            const annotation = parameter.typeAnnotation?.typeAnnotation

            if (
              previous?.type !== "TSTypeAliasDeclaration" ||
              previous.id.name !== `${name}Props` ||
              annotation?.type !== "TSTypeReference" ||
              annotation.typeName.name !== `${name}Props`
            ) {
              context.report({ node: declaration.params[0], messageId: "props", data: { name } })
            }
          }

          walkAst(declaration.body, (node) => {
            if (["FunctionDeclaration", "FunctionExpression"].includes(node.type)) {
              context.report({ node, messageId: "arrow" })
            }
            if (
              node.type === "VariableDeclaration" &&
              node.kind !== "const" &&
              node.declarations.some((item) => item.init?.type === "ArrowFunctionExpression")
            ) {
              context.report({ node, messageId: "arrow" })
            }
          })
        }
      },
    }
  },
}
