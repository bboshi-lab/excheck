# Architecture and decisions

> 공통 코어 분리 이후의 현재 의존 방향과 저장·검증 계약은 [공통 보드 코어 설계](CORE_ARCHITECTURE.md)를 참고하세요. 아래 초기 구조 설명 중 코어·어댑터에 관한 내용은 해당 문서로 대체됩니다.

```
React routes → TanStack Query → fetch /api/*
                                 ├─ MSW browser (default, including deployed demo)
                                 └─ Hono → ReleaseBoard Durable Object (local reference)
Zustand → workstream filter only
Shared domain → Zod validation, types, readiness, fixtures, activity
```

- **Client/server state:** Query owns remote state and invalidation. Zustand owns only the user's transient filter. Mutations are pessimistic: no optimistic success to roll back, and duplicate writes are disabled while pending.
- **API:** GET `/api/board` → 200 Board; POST `/api/tasks` → 201 Task; PATCH `/api/tasks/:id` → 200 Task. Invalid JSON/input → 400; absent task → 404. Error body is `{error:string}`. Same schemas and activity helpers in mock and backend; behavior tested separately.
- **Worker persistence:** a Durable Object serializes storage updates and persists one demo board in SQLite-backed storage. Avoids isolate-global data loss/races. Never remotely deployed or connected to Cloudflare. No authentication: a real public backend would require auth, workspace isolation, rate limits, quotas and migrations before exposure.
- **Mock lifecycle:** generated MSW service worker is committed; interception starts before React renders. State lives in the page module, resets on reload, and activity is bounded to 20 entries. HTTPS or localhost is required for service workers. Deployment explicitly sets mock mode. No Worker credentials are required.
- **Routing/deployment:** HashRouter avoids server rewrites on static hosting. Vite BASE_PATH supports `/excheck/`, including service worker URL and API paths. The Worker API is rooted at `/api/`; real-mode use would require a same-origin reverse proxy or an explicit API base setting. Real mode is not the deployed demo.
- **UI:** Tailwind v4 Vite plugin with locally owned CSS and shadcn-style Button using CVA, Radix Slot and tailwind-merge. This is a locally authored primitive, not a claim of a full shadcn component collection. Accessible native form fields, labelled toggle buttons, alert/status states, reduced-motion handling, responsive layouts. No externally hosted font dependency.
- **Toolchain:** pnpm 11.25, Node 24, lockfile. Registry-compatible current versions are recorded in pnpm-lock.yaml. MSW 3 uses `onUnhandledFrame`, replacing older `onUnhandledRequest` examples. No stack substitutions. Vite already handles `.env` files, so separate dotenv is unnecessary. GSAP omitted: a short CSS entrance transition needs no animation runtime.

## Known tradeoffs

The initial UI groups several small view components in App.tsx; extract feature modules if multiple release types arrive. No pagination or task deletion yet; suitable for a bounded demo, not an unbounded production board. The storage double tests Worker logic, not Cloudflare's platform; a local Wrangler smoke check complements it. Public demo intentionally has no private data.
