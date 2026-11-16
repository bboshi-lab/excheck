# How this project is managed

Use the existing checkout; cloud tasks are isolated, so do not create worktrees by default.

Small-team trunk-based workflow: `main` is the integration branch, `feat/*` and `fix/*` are short-lived branches. This initial delivery is `feat/launchboard`. A single initial empty commit establishes a PR base because the repository began without commits. No GitFlow/develop branch is needed for one small app.

1. Write acceptance criteria (issue if API access exists, otherwise docs/SPEC.md).
2. Implement a cohesive slice and commit with an explanatory conventional subject.
3. Run `pnpm check`, `pnpm worker:check`, formatting and browser tests.
4. Inspect the diff independently of implementation: validation, failure paths, state lifetime, accessibility and deployment paths. Record concrete findings in REVIEW.md. Self-review is not independent human approval.
5. Push branch and open PR against main. Do not invent a PR if hosting access fails.
6. Merge after checks, then Pages deploys the mock app. A human can require branch protection; this repository does not claim it is configured.

CI runs on pushes and PRs; no issue is required for execution. CI and review are explicit commands/workflows, not invisible Codex guarantees. Remote check statuses must be observed before being called passed. No automatic bot approval is fabricated.

## Deployment / rollback

GitHub Pages is the default static host; Worker is never deployed. Set Settings → Pages → Source to GitHub Actions. The workflow has narrowly scoped Pages/OIDC permissions. `main` pushes deploy; manual dispatch can deploy a reviewed feature branch once the workflow is registered. A feature branch deployment is a demo, not a merge. Expected path is `/excheck/`; a URL is only called live after an HTTP and browser check.

Rollback by reverting the main change and allowing the same workflow to rebuild. Keep lockfile with the rollback. No paid service or Cloudflare account is required. Environment publication in Codex is separate from application deployment and is not performed by these workflows.
