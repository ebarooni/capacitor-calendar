---
name: capacitor-major-upgrade
description: >
  Use when explicitly asked to upgrade this plugin to a new Capacitor major version.
  Do not use for Cap patch or minor bumps, previous-major Cap backports, API feature work, or publish/release tasks.
metadata:
  version: '1.1'
---

# Capacitor Major Upgrade

Thin checklist for moving the plugin and example-app to Capacitor major N. Stop at a draft PR. The repo owner confirms, device-tests, merges, and publishes.

## Workflow

1. Confirm the target major and channel. Prerelease uses `@next`. GA Cap packages use `^N`; peers follow Cap / the current repo pattern (e.g. `>=N.0.0`). Ask if unclear.

2. Before Cap N deps on `main`, prepare `latest-(N-1)` with the publish workflow on `main` only (same pattern as today’s `publish-latest-7-to-npm.yml`: dispatch from `main`, job checks out `N-1.x`). Do not require the YAML on `N-1.x`:
   - On `main` still Cap N-1: add or update the `latest-(N-1)` publish workflow.
   - Create branch `N-1.x` from that tip for the maintenance code line (e.g. Cap 9 → cut `8.x`).
   - Continue the Cap N upgrade on `main`; the workflow stays on `main` only.
     This is part of the upgrade workstream, not post-merge-only and not README-only.

3. Check all open GitHub issues whose titles mark a breaking change (usually `!`). Implement and close them as part of Cap N work on `main` after the branch cut (not on the N-1 maintenance line). Ask the repo owner before deferring any.

4. Read Cap’s app and plugin update guides only. Do not paste their tables into the PR or this skill.
   - Prerelease / upcoming major: `https://capacitorjs.com/docs/next/updating/N-0` and `https://capacitorjs.com/docs/next/updating/plugins/N-0`
   - Stable major: drop `next` — e.g. Cap 8 is `https://capacitorjs.com/docs/updating/8-0` and `https://capacitorjs.com/docs/updating/plugins/8-0`

5. On `main`, follow the manual steps in those Cap guides to update the plugin and the example-app. Cap guides are authoritative for what to change. Do not treat Cap migration CLIs as the primary path. Review the diff before further edits.

6. After the Cap manual sections, do a short repo-path cross-check (not a second migration checklist). Confirm this repo’s usual paths were touched when the guides called for them: root and example-app Cap packages / `peerDependencies`, `Package.swift`, `.podspec`, plugin and example-app Gradle trees and wrappers, example-app Podfile / AppDelegate, `.nvmrc` if Cap raises Node.

7. Grep removed APIs and symbols from the Cap guides for the target major only. Fix only hits.

8. Update README Compatibility and header Cap badges for the support model:
   - `main` → Cap N / `latest`
   - Cap N-1 → `latest-(N-1)`, kept in feature sync with `main` when practical
   - Cap N-2 and older → not kept in sync (e.g. Cap 9 → `7.x` / `latest-7` stops tracking new features)
     Touch BREAKING/CHANGELOG only if needed. No unrelated API work.

9. Run `npm run bootstrap:app`, then `npm run fmt`, and whatever else the environment can verify. Note native limits (no Xcode / device smoke here).

10. Open a draft PR. State that the repo owner must checkout and test before merge. List residual risks.

## Out of scope

- Actually publishing or cutting release tags (workflow YAML for `latest-(N-1)` on `main` belongs in step 2; do not skip it)
- Mirroring Cap docs into the skill or PR
- Auto-merge, inventing native test suites, or unrelated feature work in the Cap N upgrade
- Hard-coding alpha version pins in this skill body
