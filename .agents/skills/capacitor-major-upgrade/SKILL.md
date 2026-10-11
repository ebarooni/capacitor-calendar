---
name: capacitor-major-upgrade
description: >
  Use when explicitly asked to upgrade this plugin to a new Capacitor major version.
  Do not use for Cap patch or minor bumps, Cap 7 backports, API feature work, or publish/release tasks.
metadata:
  version: '1.0'
---

# Capacitor Major Upgrade

Thin checklist for moving the plugin and example-app to Capacitor major N. Stop at a draft PR. Ehsan owns device test, merge, and publish.

## Workflow

1. Confirm the target major and channel. Prerelease uses `@next`. GA uses `^N`. Ask if either is unclear.

2. Read Cap’s app and plugin update guides only (full URLs). Do not paste their tables into the PR or this skill.
   - Prerelease / upcoming major: `https://capacitorjs.com/docs/next/updating/N-0` and `https://capacitorjs.com/docs/next/updating/plugins/N-0`
   - Stable major: drop `next` — e.g. Cap 8 is `https://capacitorjs.com/docs/updating/8-0` and `https://capacitorjs.com/docs/updating/plugins/8-0`

3. Run Cap migration tooling when documented (`plugin-migration-v{N-1}-to-v{N}`, example-app `cap migrate`). Review the diff before further edits.

4. Apply repo touchpoints for both the plugin and the example-app:
   - Root and example-app Cap packages; `peerDependencies`
   - `Package.swift` (platform, Cap SPM, drop unconditional Cordova product when Cap removes it)
   - `.podspec`
   - `android/build.gradle` (AGP, Gradle, SDKs, drop what Cap removes)
   - Example-app Gradle / Podfile / AppDelegate
   - `.nvmrc` if Cap raises Node

5. Grep for Cap’s removed APIs and symbols from the guides. Fix only hits. Example for Cap 9 today: `hasOption`, Cordova SPM product, Kotlin plugin / `core-ktx` / `targetSdkVersion`.

6. Update README Compatibility and npm-tag wording in the same pass: Cap N is `latest`; Cap N-1 is `latest-(N-1)`. When Cap 9 lands, current main becomes `latest-8` (same pattern as `latest-7`). Update badges and tag guidance. Touch BREAKING/CHANGELOG only if needed. No unrelated API work.

7. Run `npm run bootstrap:app` and whatever else the environment can verify. Note native limits (no Xcode / device smoke here).

8. Open a draft PR. State that Ehsan must checkout and test before merge. List residual risks.

## Out of scope

- Publish/release
- Previous-major branch and publish-workflow setup (human: `N-1.x` / `latest-(N-1)`, like `7.x` / `latest-7`)
- Mirroring Cap docs into the skill or PR
- Auto-merge, inventing native test suites, or unrelated feature work in the same PR
- Hard-coding alpha version pins in this skill body
