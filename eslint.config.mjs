import react from "@eslint-react/eslint-plugin"
import js from "@eslint/js"
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript"
import importX from "eslint-plugin-import-x"
import hooks from "eslint-plugin-react-hooks"
import { defineConfig } from "eslint/config"
import globals from "globals"
import path from "node:path"
import tseslint from "typescript-eslint"

import project from "./tooling/eslint/index.mjs"
import { projectRoot } from "./tooling/eslint/project-paths.mjs"

const projects = ["tsconfig.json", "tsconfig.worker.json", "tsconfig.tooling.json"].map((file) =>
  path.join(projectRoot, file),
)
const typescriptFiles = ["**/*.{ts,tsx}"]
const ownComponents = ["src/app/**/*.tsx", "src/presentation/**/*.tsx"]

export default defineConfig(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".wrangler/**",
      "coverage/**",
      "test-results/**",
      "playwright-report/**",
      "public/mockServiceWorker.js",
    ],
  },
  js.configs.recommended,
  {
    languageOptions: { globals: globals.node },
    plugins: { project },
    rules: {
      curly: ["error", "multi-line"],
      "project/import-layout": "error",
    },
  },
  {
    files: typescriptFiles,
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: { project: projects, tsconfigRootDir: projectRoot },
    },
    plugins: { "import-x": importX },
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          project: path.join(projectRoot, "tsconfig.paths.json"),
          extensions: [".ts", ".tsx", ".js", ".mjs", ".json", ".css"],
        }),
      ],
      "import-x/extensions": [".ts", ".tsx", ".js", ".mjs"],
      "import-x/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "import-x/no-cycle": "error",
      "import-x/no-unresolved": ["error", { ignore: ["^cloudflare:"] }],
      "project/module-boundaries": "error",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}", "core/**/*.ts", "infrastructure/**/*.ts", "worker/**/*.ts", "e2e/**/*.ts"],
    rules: { "project/import-paths": "error" },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { ...react.configs.recommended.plugins, "react-hooks": hooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@eslint-react/no-missing-key": "error",
      "@eslint-react/no-nested-component-definitions": "error",
      "@eslint-react/no-nested-lazy-component-declarations": "error",
      "@eslint-react/no-direct-mutation-state": "error",
      "@eslint-react/no-clone-element": "error",
      "project/no-table-or-break": "error",
    },
  },
  {
    files: ownComponents,
    ignores: ["**/*.test.tsx", "src/presentation/ui/**"],
    rules: { "project/component-conventions": "error", "project/component-composition": "error" },
  },
  {
    files: ["src/presentation/ui/**/*.{ts,tsx}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
)
