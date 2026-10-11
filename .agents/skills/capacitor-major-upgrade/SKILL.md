---
name: capacitor-major-upgrade
description: >
  Use when explicitly asked to upgrade this plugin to a new Capacitor major version.
  Do not use for Cap patch or minor bumps, previous-major Cap backports, API feature work, or publish/release tasks.
metadata:
  version: '1.0'
---

# Capacitor Major Upgrade

Thin checklist for moving the plugin and example-app to Capacitor major N. Stop at a draft PR. The repo owner confirms, device-tests, merges, and publishes.

## Workflow

1. Confirm the target major and channel. Prerelease uses `@next`. GA Cap packages use `^N`; peers follow Cap / the current repo pattern (e.g. `>=N.0.0`). Ask if unclear.

2. Before Cap N deps on `main`, prepare `latest-(N-1)` so the publish workflow ends up on both `main` and `N-1.x` (same idea as today’s `publish-latest-7-to-npm.yml` on `main`):
   - On `main` still Cap N-1: add or update the `latest-(N-1)` publish workflow.
   - Create branch `N-1.x` from that tip (e.g. Cap 9 → cut `8.x`) so `N-1.x` also has the workflow.
   - Then continue the Cap N upgrade on `main`; the workflow stays on `main`.
   This is part of the upgrade workstream, not post-merge-only and not README-only.

3. Read Cap’s app and plugin update guides only (full URLs). Do not paste their tables into the PR or this skill.
   - Prerelease / upcoming major: `https://capacitorjs.com/docs/next/updating/N-0` and `https://capacitorjs.com/docs/next/updating/plugins/N-0`
   - Stable major: drop `next` — e.g. Cap 8 is `https://capacitorjs.com/docs/updating/8-0` and `https://capacitorjs.com/docs/updating/plugins/8-0`

4. On `main`, run Cap migration tooling from the right cwd when documented (`plugin-migration-v{N-1}-to-v{N}` from plugin root; `cap migrate` from `example-app/`). Review the diff before further edits.

5. Apply Cap N repo touchpoints on `main` for both the plugin and the example-app:
   - Root and example-app Cap packages; `peerDependencies`
   - `Package.swift` (platform, Cap SPM, drop unconditional Cordova product when Cap removes it)
   - `.podspec`
   - Android Gradle including `gradle-wrapper.properties` and example-app Gradle trees as Cap lists (AGP, SDKs, drop what Cap removes)
   - Example-app Podfile / AppDelegate
   - `.nvmrc` if Cap raises Node

6. Grep removed APIs and symbols from the Cap guides for the target major only. Fix only hits.

7. Update README Compatibility and header Cap badges for the support model:
   - `main` → Cap N / `latest`
   - Cap N-1 → `latest-(N-1)`, kept in feature sync with `main` when practical
   - Cap N-2 and older → not kept in sync (e.g. Cap 9 → `7.x` / `latest-7` stops tracking new features)
   Touch BREAKING/CHANGELOG only if needed. No unrelated API work.

8. Run `npm run bootstrap:app`, then `npm run fmt`, and whatever else the environment can verify. Note native limits (no Xcode / device smoke here).

9. Open a draft PR. State that the repo owner must checkout and test before merge. List residual risks.

## Out of scope

- Actually publishing or cutting release tags (workflow YAML for `latest-(N-1)` on both `main` and `N-1.x` belongs in step 2; do not skip it)
- Mirroring Cap docs into the skill or PR
- Auto-merge, inventing native test suites, or unrelated feature work in the Cap N upgrade
- Hard-coding alpha version pins in this skill body
