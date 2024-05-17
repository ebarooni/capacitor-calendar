# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Contents

- [v6 Releases (latest)](#v6-releases-latest)
- [v5 Releases (LTS)](#v5-releases-lts)

# v6 Releases (latest)

Changelogs for the versions supporting Capacitor 6.

## [6.4.0] – 2024-05-17

### Added

- New methods to request runtime permissions beside using the permission constants

### Fixed

- `createEventWithPrompt` throwing error because of undefined event id

## [6.3.0] – 2024-05-10

### Added

- Fetch reminders from selected or all reminder lists (iOS)
- Delete reminders by id (iOS)

### Fixed

- Using `isAllDay` with `createEventWithPrompt` on Android was not functional

## [6.2.0] – 2024-05-04

### Added

- Create calendars (iOS)
- Delete calendars (iOS)

### Fixed

- `listCalendars` on Android returning calendar id of type number instead of string
- `createEventWithPrompt` on Android was not using all options
- `createEventWithPrompt` and `selectCalendarsWithPrompt` were throwing error instead of returning empty array on cancel

## [6.1.0] – 2024-05-01

### Changed

- `createEventWithPrompt` accepts options
- Add an alarm for the created events

### Fixed

- Misplaced code in plugin iOS implementation
- Example app missing permissions for contact on iOS 16 and lower
- Permissions documentation on iOS incomplete for iOS 16 and lower

## [6.0.0] – 2024-04-28

### Added

- Check permissions
- Check all permissions
- Request permissions
- Request all permissions
- Create event with prompt
- Create event programmatically
- Select calendars with prompt (iOS)
- List calendars
- Get default calendar
- Get all reminders lists (iOS)
- Get default reminders list (iOS)
- Create reminder (iOS)
- Open calendars app
- Open reminders app (iOS)
- List events in a specified date range
- Delete events by ID

# v5 Releases (LTS)

Changelogs for the versions supporting Capacitor 5.

## [5.4.0] – 2024-05-17

### Added

- New methods to request runtime permissions beside using the permission constants

### Fixed

- `createEventWithPrompt` throwing error because of undefined event id

## [5.3.0] – 2024-05-10

### Added

- Fetch reminders from selected or all reminder lists (iOS)
- Delete reminders by id (iOS)

### Fixed

- Using `isAllDay` with `createEventWithPrompt` on Android was not functional

## [5.2.0] – 2024-05-04

### Added

- Create calendars (iOS)
- Delete calendars (iOS)

### Fixed

- `listCalendars` on Android returning calendar id of type number instead of string
- `createEventWithPrompt` on Android was not using all options
- `createEventWithPrompt` and `selectCalendarsWithPrompt` were throwing error instead of returning empty array on cancel

## [5.1.0] – 2024-05-01

### Changed

- `createEventWithPrompt` accepts options
- Add an alarm for the created events

### Fixed

- Misplaced code in plugin iOS implementation
- Example app missing permissions for contact on iOS 16 and lower
- Permissions documentation on iOS incomplete for iOS 16 and lower

## [5.0.0] – 2024-04-28

### Added

- Check permissions
- Check all permissions
- Request permissions
- Request all permissions
- Create event with prompt
- Create event programmatically
- Select calendars with prompt (iOS)
- List calendars
- Get default calendar
- Get all reminders lists (iOS)
- Get default reminders list (iOS)
- Create reminder (iOS)
- Open calendars app
- Open reminders app (iOS)
- List events in a specified date range
- Delete events by ID
