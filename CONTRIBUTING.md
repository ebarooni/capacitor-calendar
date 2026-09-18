# Contributing

Thank you for helping improve `@ebarooni/capacitor-calendar`. This guide covers how to set up the project, make changes, and open a pull request.

## Ways to contribute

- Report bugs and request features in [GitHub Issues](https://github.com/ebarooni/capacitor-calendar/issues).
- Fix bugs, improve docs, or add features via pull requests.
- Improve the [example app](example-app/) so others can verify behavior on device.

Before you start large work, open an issue or comment on an existing one. That avoids duplicate effort and keeps the public API consistent across platforms.

## Prerequisites

- **Node.js** — use the version in [`.nvmrc`](.nvmrc) (for example with [nvm](https://github.com/nvm-sh/nvm): `nvm use`).
- **npm** — comes with Node.js.
- **Xcode** — required for iOS builds and `npm run verify:ios` (macOS only).
- **Android Studio / JDK** — required for Android builds and `npm run verify:android`.
- **SwiftLint** (macOS, for iOS lint/format) — required on your `PATH`. The `swiftlint` npm package only wraps the binary:

  ```shell
  brew install swiftlint
  ```

- **ktlint** (for Android Kotlin lint/format) — install a global `ktlint` binary on your `PATH` ([install options](https://github.com/pinterest/ktlint#installation)). On macOS:

  ```shell
  brew install ktlint
  ```

You can still contribute TypeScript, docs, or web-only changes without Xcode, Android Studio, SwiftLint, or ktlint. Run the checks that match the platforms you change (see [Development scripts](#development-scripts)).

## Local setup

1. Fork the repository and clone your fork.
2. Create a branch from `main` for your change.
3. Install dependencies and wire the example app to your local plugin build:

   ```shell
   npm run bootstrap:app
   ```

   This installs plugin dependencies, builds the plugin, installs the example app, builds it, and runs `npx cap sync` so iOS and Android use your local package.

4. Open the native projects when you need to run on a device or simulator:

   - iOS: `example-app/ios/App/App.xcworkspace` in Xcode
   - Android: `example-app/android` in Android Studio

5. For a web-only smoke test of the example app:

   ```shell
   cd example-app && npm start
   ```

After you change plugin code, rebuild and re-sync before you retest on device:

```shell
npm run build && npm run sync:app
```

Or run `npm run bootstrap:app` again if you need a full refresh.

## Project layout

| Path | Role |
| --- | --- |
| `src/` | Public TypeScript API and web implementation |
| `src/definitions.ts` | Plugin interface assembled from `src/sub-definitions/` |
| `src/schemas/` | Shared types, enums, and option/result interfaces |
| `android/` | Android (Kotlin) implementation |
| `ios/Plugin/` | iOS (Swift) implementation |
| `example-app/` | Capacitor demo used to exercise the plugin |
| `mcp/` | Optional MCP server for AI assistants |
| `CHANGELOG.md` | Concise release history |
| `BREAKING.md` | Breaking changes and migration steps |

Do not edit generated output by hand:

- `dist/` — produced by the TypeScript and Rollup build
- API sections in `README.md` between `<docgen-index>` / `<docgen-api>` — regenerated when you run `npm run build` (which runs `docgen` from the public TypeScript definitions)

## Platform rules

This plugin ships web, Android, and iOS. Keep those surfaces aligned.

- Prefer changing the public TypeScript contract in `src/` first, then implement each platform.
- If a method or option cannot work on a platform, document the limitation in the public API JSDoc and keep error behavior consistent with similar methods.
- Reminders APIs are iOS-only; do not invent incomplete Android stubs without an agreed design.
- For public API comments, write for app developers. Prefer plugin terms and platform names (iOS, Android, web). Avoid native API jargon in prose.

## Development scripts

| Script | Purpose |
| --- | --- |
| `npm run bootstrap:app` | Full local setup: install, build plugin, install/build example app, sync |
| `npm run build` | Clean, regenerate README API docs, compile TypeScript, bundle with Rollup |
| `npm run lint` | All platforms: ESLint, Prettier check, SwiftLint, ktlint |
| `npm run fmt` | All platforms: auto-fix lint and formatting where possible |
| `npm run eslint` / `npm run prettier:check` | TypeScript and formatting only (no SwiftLint or ktlint) |
| `npm run verify` | Build/validate iOS, Android, and web |
| `npm run verify:web` | Same as `npm run build` |
| `npm run verify:ios` | `xcodebuild` for the plugin scheme (macOS) |
| `npm run verify:android` | Gradle clean/build/test in `android/` |
| `npm run sync:app` | `npx cap sync` inside `example-app/` |

`npm run lint` and `npm run fmt` always run every platform linter. If you only changed TypeScript or docs, use `npm run eslint` and `npm run prettier:check` (or `npm run prettier:fix`) instead. Before you open a pull request that touches native code, run `npm run fmt` and the `verify:*` scripts for the platforms you changed.

## Issues

Use [GitHub Issues](https://github.com/ebarooni/capacitor-calendar/issues) for bugs and feature requests.

### Title format

```text
<type>(<scope>): <description>
```

- **type:** `feat`, `bug`, `docs`, `refactor`, or `chore`
- **scope (optional):** `android`, `ios`, or `web` — omit when the issue spans more than one
- Append `!` when the change is breaking: `feat!: …` or `feat(android)!: …`
- Issues use `bug`. Pull requests and commits that fix the bug use `fix`.

Examples:

- `bug(ios): reminder alerts ignore dueDate when startDate is missing`
- `feat(android): support span in modifyEvent`
- `docs: clarify web partial support`

### Body

State the problem or goal, the expected behavior, and enough steps or code to reproduce. Name relevant files when you know them. Search existing issues first.

## Pull requests

1. Base your branch on the latest `main`.
2. Keep the change focused. Prefer small PRs over large mixed ones.
3. Update docs when behavior or the public API changes. Edit the TypeScript JSDoc (and any hand-written README sections). Do not hand-edit the generated API blocks in `README.md`; run `npm run build` so they refresh. For user-facing changes, describe the changelog entry in the pull request (or draft a bullet in `CHANGELOG.md`). Do not bump the package version. Maintainers place the final `CHANGELOG.md` / `BREAKING.md` entries under the release version.
4. Exercise the change in `example-app` on the affected platforms when you can.
5. Open a pull request against `main`.

### Title format

```text
<type>(<scope>): <description>
```

- **type:** `feat`, `fix`, `docs`, `refactor`, `chore`, `style`, or `perf`
- **scope (optional):** `android`, `ios`, or `web`
- Append `!` for breaking changes
- Prefer the same conventional format for commit messages.

### Body

- Summarize what changed and why.
- Link the issue with `Closes: #<number>` when applicable.
- Include a short test plan (checklist of what you verified).

### Review expectations

Maintainers may ask for API or naming changes so the plugin stays consistent across platforms. Please treat that as normal for a multi-platform Capacitor plugin.

## Releases

Package publishing and GitHub releases are maintainer-only. Contributors do not need to run `npm publish` or bump versions.

## Questions

If something in this guide is unclear, open an issue or ask on the related pull request. Thanks again for contributing.
