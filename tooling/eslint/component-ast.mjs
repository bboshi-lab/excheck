export function componentDeclarations(program) {
  return program.body.flatMap((statement, index) => {
    const declaration = statement.declaration ?? statement

    if (
      declaration.type === "FunctionDeclaration" &&
      (/^[A-Z]/.test(declaration.id?.name ?? "") || statement.type === "ExportDefaultDeclaration")
    ) {
      return [{ declaration, statement, index, name: declaration.id?.name ?? "DefaultComponent" }]
    }
    if (
      statement.type === "ExportDefaultDeclaration" &&
      ["ArrowFunctionExpression", "FunctionExpression"].includes(declaration.type)
    ) {
      return [{ declaration, statement, index, name: declaration.id?.name ?? "DefaultComponent" }]
    }
    if (declaration.type !== "VariableDeclaration") return []

    return declaration.declarations
      .filter(
        (node) =>
          /^[A-Z]/.test(node.id.name ?? "") &&
          ["ArrowFunctionExpression", "FunctionExpression"].includes(node.init?.type),
      )
      .map((node) => ({ declaration: node.init, statement, index, name: node.id.name }))
  })
}

export function walkAst(node, visitor) {
  if (!node || typeof node !== "object") return

  if (typeof node.type === "string") visitor(node)

  for (const [key, value] of Object.entries(node)) {
    if (["parent", "loc", "range", "tokens", "comments"].includes(key)) continue

    if (Array.isArray(value)) value.forEach((child) => walkAst(child, visitor))
    else if (value && typeof value === "object") walkAst(value, visitor)
  }
}
