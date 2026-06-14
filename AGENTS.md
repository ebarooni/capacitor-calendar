# Agents Instructions

This file provides instructions for AI coding agents working on the `ebarooni/capacitor-calendar` codebase.

## Root Folders

- `src/`: Main TypeScript source definitions for the plugin
- `android/`: Android implementation of the plugin
- `ios/`: iOS implementation of the plugin
- `example-app/`: Vite + Ionic (CDN) demo app that installs the plugin from the parent project locally and provides buttons to test each method
- `assets/`: Static assets used mainly in `README.md`
- `dist/`: Compiled version of `src/` generated when building the project

## Core Architecture (`src/`, `android/` and `ios/` folders)

- `src/definitions.ts`: Public TypeScript API for the plugin (extends the interfaces defined in `src/sub-definitions/`)
- `src/schemas/`: Types, enums and interfaces used in the public API
- `src/web.ts`: Web implementation of the plugin
- `src/index.ts`: Exports all the definitions
- `android/src/main/java/dev/barooni/capacitor/calendar/`: Android implementation of the public TypeScript API
    - `CapacitorCalendarPlugin.kt`: Entry point for the Android implementation; all plugin methods are registered here
- `ios/plugin/`: iOS implementation of the public Typescript API
    - `CapacitorCalendarPlugin.swift`: Entry point for the iOS implementation
    - `PluginConfig.swift`: The plugin methods are defined here

## Commands

To raise the version (without creating a git tag), run one of:

```bash
npm run version:major
npm run version:minor
npm run version:patch
```

Install plugin dependencies, build the plugin, then install the latest local version into the example app and sync:

```bash
npm run bootstrap:app
```

Run linters and format the code:

```bash
npm run fmt
```

## PR Guidelines

- The title should be formatted as `<type>(<scope>): <description>`
    - **Types**: `feat`, `fix`, `docs`, `refactor`, `chore`, `style` or `perf`
    - **Scopes**: `android`, `ios` or `web`
        - The scope can be omitted if multiple scopes apply
- The body should reference the issue the PR closes: `Closes: #<ISSUE_NUMBER>`

## Deployment

### CI/CD Pipeline (GitHub Actions)

- Workflow: `.github/workflows/publish-to-npm.yml`
    - Triggered manually
    - Triggers the `release.yml` workflow to create a release
    - Triggers the `deploy-docs.yml` workflow to update the docs
