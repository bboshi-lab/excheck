const forbiddenTags = new Set([
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "col",
  "colgroup",
  "br",
])

export const noTableOrBreak = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: { markup: "'{{name}}' 대신 역할별 컴포넌트·목록·CSS 줄바꿈을 사용하세요." },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== "JSXIdentifier" || !forbiddenTags.has(node.name.name)) return

        context.report({ node, messageId: "markup", data: { name: node.name.name } })
      },
      JSXAttribute(node) {
        if (node.name.name !== "role") return

        const value = node.value?.type === "JSXExpressionContainer" ? node.value.expression.value : node.value?.value

        if (value === "table") context.report({ node, messageId: "markup", data: { name: 'role="table"' } })
      },
    }
  },
}
