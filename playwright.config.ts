import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: `http://127.0.0.1:${process.env.TEST_PORT || 4173}${process.env.BASE_PATH || "/"}`,
    launchOptions: { executablePath: process.env.CHROMIUM_PATH },
  },
  webServer: {
    command: `pnpm preview --port ${process.env.TEST_PORT || 4173}`,
    url: `http://127.0.0.1:${process.env.TEST_PORT || 4173}${process.env.BASE_PATH || "/"}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
})
