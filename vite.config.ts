import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitest/config"
import projectPaths from "./tsconfig.paths.json" with { type: "json" }

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE_PATH || "/",
  resolve: {
    alias: Object.entries(projectPaths.compilerOptions.paths).map(([alias, [target]]) => ({
      find: alias.replace("/*", ""),
      replacement: fileURLToPath(new URL(target.replace("/*", ""), import.meta.url)),
    })),
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "charts",
              test: /node_modules\/(?:recharts|d3-[^/]+|@reduxjs|redux|react-redux|reselect|immer|victory-vendor|decimal.js-light|eventemitter3)\//,
            },
            { name: "motion", test: /node_modules\/(?:gsap|@gsap)\// },
            { name: "react", test: /node_modules\/(?:react|react-dom|scheduler|react-router|@tanstack)\// },
          ],
        },
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["core/**/*.test.ts", "infrastructure/**/*.test.ts", "worker/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "react",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          setupFiles: ["./src/test/setup.ts"],
        },
      },
    ],
  },
})
