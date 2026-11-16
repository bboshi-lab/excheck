# Launchboard v0.1 — scope and acceptance

A release captain needs to see what stands between a team and its next launch. Launchboard turns scattered checks into a calm, visible workspace.

| Story               | Acceptance                                                                                                 | Evidence        |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | --------------- |
| Inspect readiness   | Completed / total checks yields a rounded percent; zero checks yields 0%, not ready                        | Domain tests    |
| Complete or reopen  | Toggle updates server state, readiness and activity; rejected write keeps prior state                      | RTL + API tests |
| Add a check         | Trimmed 3–100 character title, one of three workstreams; successful create closes form and refreshes board | RTL + API tests |
| Focus a workstream  | All, Engineering, Design, Operations; switching filters preserves data                                     | RTL             |
| Recover from errors | Failed initial load offers retry; failed mutation shows an alert                                           | RTL             |
| Explore demo        | Desktop/mobile; hash routes survive refresh; reload resets mock state                                      | Playwright      |

Non-goals: authentication, actual release execution, issue tracker integration, drag and drop, deletion, multi-project editing, or durable browser storage. A percentage is a checklist metric, not an assertion that deployment is safe. “Project Atlas” is fixture content, not a selectable project. All visitors get an independent mock workspace.

## Delivery slices

1. Foundation: pinned toolchain, domain model, API contract, Hono Worker.
2. Workspace: responsive dashboard, server data, filters, accessible forms.
3. Confidence: unit, integration, browser tests, CI, static demo deployment.

This document is the local issue/spec record when the hosting API is unavailable. It is not represented as a created GitHub issue.
