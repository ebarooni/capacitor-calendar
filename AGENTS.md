# Agents Instructions

This file provides instructions for AI coding agents working on the `ebarooni/capacitor-calendar` codebase.

## Root Folders

- `android/`: Android implementation of the plugin
- `assets/`: Static assets (images, badges, etc.)
- `example-app/`: Vite + Ionic (CDN) demo app that installs the plugin from the parent project locally and provides buttons to test each method
- `dist/`: Compiled version of `src/` generated when building the project
- `ios/`: iOS implementation of the plugin
- `src/`: Main TypeScript source definitions for the plugin
- `mcp/`: Implementation of the MCP server of the plugin

## Core Architecture (`src/`, `android/` and `ios/` folders)

- `android/src/main/java/dev/barooni/capacitor/calendar/`: Android implementation of the public TypeScript API
  - `models/inputs/`: Data classes encapsulating the method options
  - `models/results/`: Data classes encapsulating the method result
  - `CapacitorCalendarPlugin.kt`: Entry point for the Android implementation; all plugin methods are registered here
- `ios/plugin/`: iOS implementation of the public Typescript API
  - `Models/Inputs/`: Structs encapsulating the method options
  - `Models/Results/`: Structs encapsulating the method result
  - `CapacitorCalendarPlugin.swift`: Entry point for the iOS implementation
  - `PluginConfig.swift`: The plugin methods are defined here
- `src/schemas/`: Types, enums and interfaces used in the public API
  - `interfaces/`: Options and result interfaces of the methods
- `src/definitions.ts`: Public TypeScript API for the plugin (extends the interfaces defined in `src/sub-definitions/`)
- `src/index.ts`: Exports all the definitions
- `src/web.ts`: Web implementation of the plugin

## Commands

Install plugin dependencies, build the plugin, then install the latest local version into the example app and sync:

```bash
npm run bootstrap:app
```

Run linters and format the code:

```bash
npm run fmt
```

## Documentation

- `README.md`: Do not modify the content between the `<docgen-index>` and `<docgen-api>` markers. That block is auto-generated; update the source JSDoc comments instead.
- Assets: Images and other static files used by `README.md` (and docs) live in `assets/`

## PR Guidelines

- The title should be formatted as `<type>(<scope>): <description>`
  - Types: `feat`, `fix`, `docs`, `refactor`, `chore`, `style` or `perf`
  - Scopes: `android`, `ios` or `web`
    - The scope can be omitted if multiple scopes apply
- The body should reference the issue the PR closes: `Closes: #<ISSUE_NUMBER>`

## Deployment

### CI/CD Pipeline (GitHub Actions)

- Workflow: `.github/workflows/publish-to-npm.yml`
  - Triggered manually
  - Triggers the `release.yml` workflow to create a release
  - Triggers the `deploy-docs.yml` workflow to update the docs

### MCP Server (`mcp/` folder)

- Workflow: `.github/workflows/publish-docker.yml`
  - Triggered manually
  - Publishes the Docker image to `ghcr.io/ebarooni/capacitor-calendar-mcp`
  - When bumping the MCP server version, update the image tag in `mcp/README.md` and `README.md` to match.
