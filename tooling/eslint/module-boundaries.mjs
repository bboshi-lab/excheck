import { moduleVisitors, relativeProjectPath, resolveProjectImport } from "./project-paths.mjs"

const layers = [
  ["core/domain/", "domain"],
  ["core/application/ports/", "ports"],
  ["core/application/", "application"],
  ["core/contracts/", "contracts"],
  ["core/fixtures/", "fixtures"],
  ["infrastructure/", "infrastructure"],
  ["worker/", "worker"],
  ["src/presentation/ui/", "ui"],
  ["src/presentation/", "presentation"],
  ["src/shared/", "shared"],
  ["src/infrastructure/", "client"],
  ["src/mocks/", "mocks"],
  ["src/app/", "composition"],
]
const allowed = {
  domain: ["domain"],
  ports: ["ports", "domain"],
  application: ["application", "ports", "domain"],
  contracts: ["contracts", "domain"],
  fixtures: ["fixtures", "domain"],
  infrastructure: ["infrastructure", "domain", "ports", "application", "contracts", "fixtures"],
  worker: ["worker", "infrastructure", "domain", "ports", "application", "contracts", "fixtures"],
  ui: ["ui", "shared"],
  shared: ["shared"],
  presentation: ["presentation", "ui", "shared", "domain", "ports", "contracts"],
  client: ["client", "domain", "ports", "contracts"],
  mocks: ["mocks", "infrastructure", "domain", "ports", "application", "contracts", "fixtures"],
  composition: [
    "composition",
    "presentation",
    "ui",
    "shared",
    "client",
    "mocks",
    "domain",
    "ports",
    "contracts",
    "assets",
  ],
}

export function projectLayer(filename) {
  const relative = relativeProjectPath(filename)

  if (relative === "src/main.tsx") return "composition"
  if (relative === "src/styles.css") return "assets"
  if (/\.(?:test|spec)\./.test(relative) || relative.startsWith("src/test/") || relative.startsWith("e2e/")) {
    return "test"
  }

  return layers.find(([prefix]) => relative.startsWith(prefix))?.[1] ?? "unknown"
}

export const moduleBoundaries = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      boundary: "{{from}} 계층에서 {{to}} 계층을 import할 수 없습니다: {{path}}",
      external: "{{layer}} 계층은 외부 패키지에 의존하지 않습니다: {{path}}",
    },
  },
  create(context) {
    const from = projectLayer(context.filename)

    if (from === "test" || from === "unknown") return {}

    return moduleVisitors((node) => {
      if (typeof node.value !== "string") return

      const target = resolveProjectImport(node.value, context.filename)

      if (!target) {
        if (["domain", "ports", "application", "fixtures"].includes(from)) {
          context.report({ node, messageId: "external", data: { layer: from, path: node.value } })
        }
        return
      }

      const to = projectLayer(target)

      if (allowed[from]?.includes(to)) return

      context.report({ node, messageId: "boundary", data: { from, to, path: node.value } })
    })
  },
}
