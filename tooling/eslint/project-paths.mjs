import path from "node:path"
import { fileURLToPath } from "node:url"
import config from "../../tsconfig.paths.json" with { type: "json" }

export const projectRoot = path.resolve(fileURLToPath(new URL("../../", import.meta.url)))

const aliases = Object.entries(config.compilerOptions.paths)
  .map(([name, [target]]) => ({
    name: name.replace("/*", ""),
    directory: path.resolve(projectRoot, target.replace("/*", "")),
  }))
  .sort((left, right) => right.directory.length - left.directory.length)

export function relativeProjectPath(filename) {
  return path.relative(projectRoot, filename).split(path.sep).join("/")
}

export function resolveProjectImport(specifier, filename) {
  if (specifier.startsWith(".")) return path.resolve(path.dirname(filename), specifier)

  const alias = aliases.find(({ name }) => specifier.startsWith(`${name}/`))

  if (!alias) return null

  return path.resolve(alias.directory, specifier.slice(alias.name.length + 1))
}

export function canonicalImportPath(specifier, filename) {
  const target = resolveProjectImport(specifier, filename)

  if (!target) return null

  const alias = aliases.find(({ directory }) => target.startsWith(`${directory}${path.sep}`))

  if (!alias) return null

  const suffix = path
    .relative(alias.directory, target)
    .split(path.sep)
    .join("/")
    .replace(/\.(?:ts|tsx)$/, "")

  return `${alias.name}/${suffix}`
}

export function moduleVisitors(check) {
  return {
    ImportDeclaration: (node) => check(node.source),
    ExportNamedDeclaration: (node) => node.source && check(node.source),
    ExportAllDeclaration: (node) => check(node.source),
    ImportExpression: (node) => check(node.source),
    TSImportType: (node) => check(node.source),
  }
}
