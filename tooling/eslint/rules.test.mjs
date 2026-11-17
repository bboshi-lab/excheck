import { RuleTester } from "eslint"
import path from "node:path"
import { describe, it } from "node:test"
import tseslint from "typescript-eslint"

import project from "./index.mjs"
import { projectRoot } from "./project-paths.mjs"

RuleTester.describe = describe
RuleTester.it = it
RuleTester.itOnly = it.only

const tester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})
const filename = path.join(projectRoot, "src/presentation/example.tsx")
const run = (rule, cases) => tester.run(rule, project.rules[rule], cases)

run("import-layout", {
  valid: [
    'import React from "react"\nimport { Card } from "@ui/card"',
    'import React from "react"\nimport type { Task } from "@core/domain/task"\nimport { Card } from "@ui/card"',
    'import React from "react"\nimport { create } from "zustand"\n\nimport type { Task } from "@core/domain/task"\nimport { Card } from "@ui/card"',
    'import "./first.css"\nimport "./second.css"',
    'import React from "react"\n// 입력 공통 UI\nimport { Card } from "@ui/card"',
    'import React from "react" // React 런타임\nimport { Card } from "@ui/card"',
    'import "./setup.mjs"\nimport { Card } from "@ui/card"\nimport "./styles.css"',
  ].map((code) => ({ code, filename })),
  invalid: [
    {
      code: 'import React from "react"\n\nimport { Card } from "@ui/card"',
      output: 'import React from "react"\nimport { Card } from "@ui/card"',
      errors: [{ messageId: "layout" }],
      filename,
    },
    {
      code: 'import { Card } from "@ui/card"\nimport React from "react"',
      output: 'import React from "react"\nimport { Card } from "@ui/card"',
      errors: [{ messageId: "layout" }],
      filename,
    },
    {
      code: 'import React from "react"\nimport { create } from "zustand"\nimport type { Task } from "@core/domain/task"\nimport { Card } from "@ui/card"',
      output:
        'import React from "react"\nimport { create } from "zustand"\n\nimport type { Task } from "@core/domain/task"\nimport { Card } from "@ui/card"',
      errors: [{ messageId: "layout" }],
      filename,
    },
    {
      code: 'import React from "react"\n\n// 공통 UI\nimport { Card } from "@ui/card"',
      output: null,
      errors: [{ messageId: "layout" }],
      filename,
    },
    {
      code: 'import React from "react"\nconst value = 1\nimport { Card } from "@ui/card"',
      output: null,
      errors: [{ messageId: "layout" }],
      filename,
    },
  ],
})

run("import-paths", {
  valid: [
    { code: 'import type { Task } from "@core/domain/task"', filename },
    { code: 'import { useGSAP } from "@gsap/react"', filename },
  ],
  invalid: [
    {
      code: 'import type { Task } from "../../core/domain/task"',
      output: 'import type { Task } from "@core/domain/task"',
      filename,
      errors: [{ messageId: "alias" }],
    },
    {
      code: 'const worker = import("../mocks/browser")',
      output: 'const worker = import("@mocks/browser")',
      filename: path.join(projectRoot, "src/app/example.ts"),
      errors: [{ messageId: "alias" }],
    },
    {
      code: 'type Task = import("../../core/domain/task").Task',
      output: 'type Task = import("@core/domain/task").Task',
      filename,
      errors: [{ messageId: "alias" }],
    },
    {
      code: 'import { Card } from "@presentation/ui/card"',
      output: 'import { Card } from "@ui/card"',
      filename,
      errors: [{ messageId: "alias" }],
    },
  ],
})

run("module-boundaries", {
  valid: [
    { code: 'import type { Task } from "@core/domain/task"', filename },
    { code: 'import type { BoardGateway } from "@core/application/ports/board-gateway"', filename },
    {
      code: 'import { DurableBoardRepository } from "@worker/infrastructure/durable-board-repository"',
      filename: path.join(projectRoot, "infrastructure/http/example.test.ts"),
    },
    {
      code: 'import { BoardService } from "@core/application/board-service"',
      filename: path.join(projectRoot, "worker/index.ts"),
    },
  ],
  invalid: [
    {
      code: 'import type { ReactNode } from "react"',
      filename: path.join(projectRoot, "core/domain/example.ts"),
      errors: [{ messageId: "external" }],
    },
    { code: 'import { client } from "@client/http/board-http-client"', filename, errors: [{ messageId: "boundary" }] },
    {
      code: 'export { Task } from "@presentation/board/example"',
      filename: path.join(projectRoot, "core/domain/example.ts"),
      errors: [{ messageId: "boundary" }],
    },
    {
      code: 'type Example = import("@presentation/board/example").Example',
      filename: path.join(projectRoot, "core/domain/example.ts"),
      errors: [{ messageId: "boundary" }],
    },
    {
      code: 'const value = import("@app/app-routes")',
      filename: path.join(projectRoot, "worker/example.ts"),
      errors: [{ messageId: "boundary" }],
    },
    {
      code: 'import { BoardService } from "@core/application/board-service"',
      filename,
      errors: [{ messageId: "boundary" }],
    },
  ],
})

run("component-conventions", {
  valid: [
    "export function Title() { return <h1>제목</h1> }",
    "type TitleProps = { title: string }; export function Title({title}: TitleProps) { const handleClick = () => {}; return <button onClick={handleClick}>{title}</button> }",
    "type TitleProps = { title?: string }; export function Title({title}: TitleProps = {}) { return <h1>{title}</h1> }",
  ].map((code) => ({ code, filename })),
  invalid: [
    { code: "const Title = () => <h1>제목</h1>", errors: [{ messageId: "declaration" }], filename },
    { code: "export default () => <h1>제목</h1>", errors: [{ messageId: "declaration" }], filename },
    {
      code: "function Title() { return <h1>제목</h1> }; export {Title}",
      errors: [{ messageId: "declaration" }],
      filename,
    },
    {
      code: "interface TitleProps {title:string}; export function Title({title}: TitleProps) { return <h1>{title}</h1> }",
      errors: [{ messageId: "props" }],
      filename,
    },
    {
      code: "export function One(){return <div/>} export function Two(){return <div/>}",
      errors: [{ messageId: "single" }],
      filename,
    },
    {
      code: "export function Title(){function handleClick(){};return <button onClick={handleClick}/>}",
      errors: [{ messageId: "arrow" }],
      filename,
    },
  ],
})

run("component-composition", {
  valid: [
    "export function CardLayout(){return <div>{null}</div>}",
    'import { Card } from "@ui/card"; export function DashboardView(){return <Card/>}',
    'import { Check } from "lucide-react"; export function CheckIcon(){return <span><Check/></span>}',
  ].map((code) => ({ code, filename })),
  invalid: [
    { code: "export function DashboardView(){return <div/>}", errors: [{ messageId: "composition" }], filename },
    {
      code: 'import { Title } from "@presentation/title"; export function Header(){return <div><Title/></div>}',
      errors: [{ messageId: "composition" }],
      filename,
    },
  ],
})

run("no-table-or-break", {
  valid: [
    "export function Counts(){return <ul><li>완료 2개</li></ul>}",
    'const description = <p><span className="block">첫 문장</span><span>다음 문장</span></p>',
  ].map((code) => ({ code, filename })),
  invalid: [
    { code: "const value = <table/>", errors: [{ messageId: "markup" }], filename },
    { code: "const value = <br/>", errors: [{ messageId: "markup" }], filename },
    { code: 'const value = <div role="table"/>', errors: [{ messageId: "markup" }], filename },
    { code: 'const value = <div role={"table"}/>', errors: [{ messageId: "markup" }], filename },
  ],
})
