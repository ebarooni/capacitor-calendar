---
name: capacitor-major-upgrade
description: >
  Use when explicitly asked to upgrade this plugin to a new Capacitor major version.
  Do not use for Cap patch or minor bumps, previous-major Cap backports, API feature work, or publish/release tasks.
metadata:
  version: '1.0'
---

# Capacitor Major Upgrade

Thin checklist for moving the plugin and example-app to Capacitor major N. Stop at a draft PR. The repo owner owns device test, merge, and publish.

## Workflow

1. Confirm the target major and channel. Prerelease uses `@next`. GA Cap packages use `^N`; peers follow Cap / the current repo pattern (e.g. `>=N.0.0`). Ask if unclear.

2. Read Cap’s app and plugin update guides only (full URLs). Do not paste their tables into the PR or this skill.
   - Prerelease / upcoming major: `https://capacitorjs.com/docs/next/updating/N-0` and `https://capacitorjs.com/docs/next/updating/plugins/N-0`
   - Stable major: drop `next` — e.g. Cap 8 is `https://capacitorjs.com/docs/updating/8-0` and `https://capacitorjs.com/docs/updating/plugins/8-0`

3. Run Cap migration tooling from the right cwd when documented (`plugin-migration-v{N-1}-to-v{N}` from plugin root; `cap migrate` from `example-app/`). Review the diff before further edits.

4. Apply repo touchpoints for both the plugin and the example-app:
   - Root and example-app Cap packages; `peerDependencies`
   - `Package.swift` (platform, Cap SPM, drop unconditional Cordova product when Cap removes it)
   - `.podspec`
   - `android/build.gradle` (AGP, Gradle, SDKs, drop what Cap removes)
   - Example-app Gradle / Podfile / AppDelegate
   - `.nvmrc` if Cap raises Node

5. Grep for Cap’s removed APIs and symbols from the guides. Fix only hits. Example for Cap 9 today: `hasOption`, Cordova SPM product, Kotlin plugin / `core-ktx` / `targetSdkVersion`.

6. Update README Compatibility and npm-tag wording for the support model on upgrade to Cap N:
   - `main` → Cap N / `latest`
   - Cut branch `N-1.x` so Cap N-1 can still get updates as `latest-(N-1)` (e.g. Cap 9 → `8.x` / `latest-8`)
   - Keep Cap N-1 in feature sync with `main` when practical
   - Cap N-2 and older are no longer kept in sync (e.g. Cap 9 → `7.x` / `latest-7` stops tracking new features)
   Update badges and tag guidance. Touch BREAKING/CHANGELOG only if needed. No unrelated API work.

7. Note or prepare cutting `N-1.x` from the Cap N-1 tip before `main` is Cap N-only. The repo owner confirms the cut and publish workflows.

8. Run `npm run bootstrap:app` and whatever else the environment can verify. Note native limits (no Xcode / device smoke here).

9. Open a draft PR. State that the repo owner must checkout and test before merge. List residual risks.

## Out of scope

- Actually publishing or cutting release tags
- Mirroring Cap docs into the skill or PR
- Auto-merge, inventing native test suites, or unrelated feature work in the same PR
- Hard-coding alpha version pins in this skill body
