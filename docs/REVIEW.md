# Self-review — Launchboard v0.1

This is the author's self-review, not independent approval.

## Findings and dispositions

| Finding                                                              | Severity       | Resolution                                                                                                  |
| -------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------- |
| HashRouter would interpret the hero's `#checklist` anchor as a route | Medium         | Use a native button and scrollIntoView; browser regression now clicks it before task flows                  |
| Root-only browser checks miss Pages asset/service-worker paths       | Medium         | Add BASE_PATH support to the browser harness; both viewports exercised under `/excheck/`; CI uses that path |
| Preview's base path must match build's base path                     | Medium         | Document and exercise the same environment variable for both; initial local 404 was a preview mismatch      |
| Shared Zustand filter leaked between integration tests               | Test isolation | Reset filter alongside MSW board and QueryClient lifecycle                                                  |
| MSW 3 renamed the unhandled-request option                           | Type/build     | Use supported onUnhandledFrame; strict build verifies compatibility                                         |
| A naive Worker in-memory board would lose updates and data           | Design         | Durable Object storage with serialized mutations; storage-double tests plus local workerd functional smoke  |
| Failed writes could visually claim success                           | Medium         | Pessimistic mutation with alert and unchanged board; failure regression test                                |

## Local evidence

- Vitest: 3 files, 9 tests passed (domain, React/MSW, Hono Worker).
- TypeScript strict check and Vite production build passed.
- Wrangler dry-run bundle passed with no Cloudflare account.
- Local workerd: health, create (201), complete and persisted read passed.
- Playwright: desktop and 390px mobile flows passed at root and `/excheck/`; covers add, toggle, navigation, refresh/reset and overflow.
- Desktop/mobile screenshots inspected; no browser JavaScript errors in screenshot run.
- Remote CI/deployment status is recorded in the PR/checks, not inferred from these local results.

## Remaining limitations

No auth or production security boundary; don't expose the reference backend as a real team service. No cross-tab persistence in the mock demo, by design. Worker tests use a storage double plus a local runtime, not the Cloudflare production platform. No independent human review or branch protection is claimed. Application publication to Pages needs the GitHub integration's Pages permissions or a repository admin to enable the site.
