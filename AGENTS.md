# Agent Instructions

This file provides instructions for AI coding agents working on the `ebarooni/capacitor-calendar` repository, a Capacitor plugin for calendar functionality on Android, iOS, and the web.

## Writing Style

- Follow ASD-STE100 Simplified Technical English for vocabulary and sentence structure.
- Apply Zinsser's four principles of quality writing:
  1. Simplicity: Use common, plain words. Prefer short, direct sentences.
  2. Brevity: Remove words that do not add meaning. Do not restate the same idea in a second sentence.
  3. Clarity: State one idea per sentence. Avoid ambiguity.
  4. Humanity: Write for a person, not a manual. Be direct and respectful.
- For public API JSDoc:
  - Prefer a one-line summary.
  - Add a second sentence only when the name alone is ambiguous.
  - Do not compare related fields unless the values interact.

## Important Rules

- Ensure `projectDocuments` in `typedoc.json` doesn't list files that are deleted or not referenced in `README.md`.
- When bumping the MCP server version, update the image tag in `mcp/README.md` and `README.md` to match.

## Tool Preference

When multiple tools can perform the same task, use them in this order:

1. MCP server
2. Project-provided tooling
3. Command-line tools
4. Direct API requests

## Project Overview

- `src/`: Public TypeScript API and web implementation
- `android/`: Android implementation
- `ios/`: iOS implementation
- `example-app/`: Local test/demo application
- `mcp/`: MCP server
- `assets/`: Images and GIFs

## Architecture

### Public API

- `src/schemas/`: Types, enums and interfaces used in the public API
  - `interfaces/`: Options and result interfaces of the methods
- `src/definitions.ts`: Public TypeScript API for the plugin (extends the interfaces defined in `src/sub-definitions/`)
- `src/index.ts`: Exports all the definitions

### Android

- `android/src/main/java/dev/barooni/capacitor/calendar/`: Android implementation of the public TypeScript API
  - `models/inputs/`: Data classes encapsulating the method options
  - `models/results/`: Data classes encapsulating the method result
  - `CapacitorCalendarPlugin.kt`: Entry point for the Android implementation; all plugin methods are registered here

### iOS

- `ios/plugin/`: iOS implementation of the public TypeScript API
  - `Models/Inputs/`: Structs encapsulating the method options
  - `Models/Results/`: Structs encapsulating the method result
  - `CapacitorCalendarPlugin.swift`: Entry point for the iOS implementation
  - `PluginConfig.swift`: The plugin methods are defined here

### Web

- `src/web.ts`: Web implementation of the plugin

## Development Commands

### Build

Install plugin dependencies, build the plugin, then install the latest local version into the example app and sync:

```bash
npm run bootstrap:app
```

### Formatting

```bash
npm run fmt
```

## Generated Files

Do not manually edit generated content.

- `README.md`: Content between `<docgen-index>` and `<docgen-api>` is generated from the public API definition.
- `dist/`: Generated from `src/`.

## GitHub Guidelines

### Issue Titles

The titles should be formatted as `<type>(<scope>): <description>`.

- Types: `feat`, `bug`, `docs`, `refactor` or `chore`
- Scopes: `android`, `ios` or `web`
  - The scope can be omitted if multiple scopes apply
- Append `!` to the type or scope when the issue describes a breaking change.
  - Examples: `feat!: <description>` or `feat(android)!: <description>`

### PR Guidelines

The title should be formatted as `<type>(<scope>): <description>`

- Types: `feat`, `fix`, `docs`, `refactor`, `chore`, `style` or `perf`
- Scopes: `android`, `ios` or `web`
  - The scope can be omitted if multiple scopes apply
- Append `!` to the type or scope when the PR introduces a breaking change.
  - Examples: `feat!: <description>` or `feat(android)!: <description>`

The body should reference the issue the PR closes: `Closes: #<ISSUE_NUMBER>`

## Deployment

### npm Package

- Workflow: `.github/workflows/publish-to-npm.yml`
  - Triggered manually
  - Triggers the `release.yml` workflow to create a release
  - Triggers the `deploy-docs.yml` workflow to update the docs

### MCP Server

- Workflow: `.github/workflows/publish-docker.yml`
  - Triggered manually
  - Publishes the Docker image to `ghcr.io/ebarooni/capacitor-calendar-mcp`
