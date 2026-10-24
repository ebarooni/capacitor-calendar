# AGENTS.md

Capacitor plugin: calendars and events on iOS and Android, reminders on iOS, `.ics` files on web. Setup, layout, scripts, generated files, platform rules, and issue/PR/commit format: `CONTRIBUTING.md`.

## Gotchas

- No workflow runs on pull requests. Nothing checks a PR for you, so run the checks from `CONTRIBUTING.md` yourself.
- Do not dispatch workflows or push `v*` tags. A `v8*` tag starts `release.yml` and `deploy-docs.yml`. Actions minutes are scarce.
- `android/src/test`, `android/src/androidTest`, and `ios/Tests` hold only template stubs. Do not add or suggest tests.
- GitHub: use the MCP server in `.cursor/mcp.json` (needs `GITHUB_MCP_PAT`). Skill scripts that call `gh` need an authenticated `gh`.
- Breaking releases: document migration in `BREAKING.md` under that version (see `update-changelog`).

## Code constraints

- List every iOS method in `ios/Plugin/PluginConfig.swift` `methods`.
- Keep the entry files thin (`android/.../calendar/CapacitorCalendarPlugin.kt`, `ios/Plugin/CapacitorCalendarPlugin.swift`). Declaration checks go in `DeclarationCheck`, reject mapping in `PluginCallRejecter` (Android `utils/`, iOS `Utils/`), and error cases in `PluginError`. Helpers throw `PluginError`; only entry files resolve or reject the call.
- A method that needs Info.plist usage keys or manifest permissions checks only those keys at its start. It rejects with `EB-CLDR-0100` and names the missing key. `checkPermission` and `checkAllPermissions` stay unguarded.
- Error codes: `src/schemas/enums/capacitor-calendar-error-code.ts`. Use Capacitor Calendar's number (`OS-PLUG-CLDR-NNNN` → `EB-CLDR-NNNN`) for the same case and an unused number for plugin-only cases. A new code also needs both `PluginError` files and the `README.md` › Error codes table. Messages say exactly what failed; append OS detail in parentheses.
- Web has no permission model. Web permission methods stay unimplemented; never fake `granted`.
- The MCP server version is in `mcp/pom.xml`. When you bump it, update the image tag in `README.md` and `mcp/README.md`.
- `typedoc.json` `projectDocuments` lists only existing files that `README.md` links.

## Branches

- `main`: current Capacitor major, npm `latest`. `7.x`: Capacitor 7, npm `latest-7`, published from `main` by `publish-latest-7-to-npm.yml`.
- Capacitor major upgrade: `capacitor-major-upgrade` skill.

## Conventions

- Prose: ASD-STE100 Simplified Technical English. Plain words, short sentences, one idea per sentence. Do not restate.
- Public JSDoc: one-line summary. Add a second sentence only when the name is ambiguous. Compare fields only when their values interact.
- Names state meaning. No cryptic locals (`d`, `m`, `y`).
- Skill `metadata.version`: bump once per PR that changes a merged skill. A new skill starts at `1.0`.
