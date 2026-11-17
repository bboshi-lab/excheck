# Launchboard

A calm release-readiness workspace. Built as an end-to-end Codex Cloud exercise: product specification, feature branch, React client, mock API, reference Worker, tests and delivery workflows.

## Run

Node 24 and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Default mode is **MSW**, in development and production. No account, API key or backend is needed. Data resets on reload; the UI says so. `.env.example` documents the optional mode switch; Vite loads dotenv-format files natively.

```sh
pnpm check                  # Vitest + strict type check + production build
pnpm worker:check           # offline Worker bundle, no deployment
pnpm worker:test:local      # 로컬 workerd 동시 요청·재시작 후 저장 복원 검사
pnpm exec playwright install chromium
pnpm exec playwright test   # actual production bundle, desktop + mobile
pnpm preview               # serve the built bundle
```

In this managed environment pnpm's default home is read-only: use `XDG_DATA_HOME=/workspace/.local/share XDG_CACHE_HOME=/workspace/.cache pnpm install --frozen-lockfile`. Use `CHROMIUM_PATH=/usr/bin/chromium pnpm exec playwright test` to reuse the installed browser rather than downloading it. Standard developer machines need neither override.

For a Pages-path rehearsal: `BASE_PATH=/excheck/ pnpm build`, then `BASE_PATH=/excheck/ pnpm preview`. Use the same base path for build and preview.

Reference backend: `XDG_CONFIG_HOME=/workspace/.config WRANGLER_SEND_METRICS=false pnpm worker:dev --local` uses local Durable Object storage. Do not run remote deployment for this demo.

## Read the decisions

- [Product scope / acceptance criteria](docs/SPEC.md)
- [Architecture / API / stack choices](docs/ARCHITECTURE.md)
- [공통 보드 코어와 어댑터](docs/CORE_ARCHITECTURE.md)
- [Branch, PR, CI and release workflow](docs/WORKFLOW.md)
- [Self-review and verification evidence](docs/REVIEW.md)

The demo has no authentication and is not a production release gate. Worker code exists for review and local tests; the deployed frontend uses MSW exclusively.
