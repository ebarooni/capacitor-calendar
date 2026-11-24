# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Contents

- [Version 1.x.x](#version-1xx)
  - [1.3.0](#130)
  - [1.2.0](#120)
  - [1.1.0](#110)
  - [1.0.0](#100)

# Version 1.x.x

## 1.3.0

### Added

- `docs://error-codes` resource (reject codes, `PermissionDenied` and `MissingDeclaration` details)
- Methods `getEventById`, `startListening`, `stopListening`, `addListener` (`calendarChanged`), and `removeAllListeners`

### Changed

- `openCalendar` and `createEventWithPrompt` list Web support
- `listEventsInRange` and `modifyEvent` descriptions match the plugin docs
- Deprecated methods name their replacement
- `docs://web-behavior`: `openCalendar` without `provider`, `getEventById`, and change listening stay unimplemented
- `debug-permission-denied` prompt checks `error.code`

## 1.2.0

### Added

- `docs://web-behavior` resource (ICS export model; no permission APIs on web; ignored options)

### Changed

- `docs://web-behavior`: document `createEventWithPrompt` and `autoDownloadIcsFile` defaults

## 1.1.0

### Changed

- `createEvent` now lists Web support (ICS file export)
- `listMethods` and `searchMethods` platform filter docs include `web`

## 1.0.0

### Added

- Tool to get a method (`getMethod`)
- Tool to list all methods (`listMethods`)
- Tool to search for a method (`searchMethods`)
- Tool to validate `AndroidManifest` and `Info.plist` files (`validateAndroidManifest` & `validateInfoPlist`)
- Prompt to choose the correct permissions (`choose-access-level`)
- Prompt to debug why the permissions are always denied (`debug-permission-denied`)
- Prompt to setup the plugin for a platform (`setup-for-platform`)
- Permission resources for both platforms
