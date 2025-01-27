# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Contents

- [Version 6.x.x](#version-6xx)
  - [6.7.2](#672)
  - [6.7.1](#671)
  - [6.7.0](#670)
  - [6.6.1](#661)
  - [6.6.0](#660)
  - [6.5.0](#650)
  - [6.4.1](#641)
  - [6.4.0](#640)
  - [6.3.0](#630)
  - [6.2.0](#620)
  - [6.1.0](#610)
  - [6.0.0](#600)
- [Version 5.x.x](#version-5xx)
  - [5.5.0](#550)
  - [5.4.1](#541)
  - [5.4.0](#540)
  - [5.3.0](#530)
  - [5.2.0](#520)
  - [5.1.0](#510)
  - [5.0.0](#500)

# Version 6.x.x

Changelogs for the versions supporting Capacitor 6.

## 6.7.2

### Fixed

- Android build error related to Kotlin version

## 6.7.1

### Added

- Added `eventIdOptional` property to `createEventWithPrompt` on Android

## 6.7.0

### Fixed

- Return type of `modifyEvent` on iOS

### Added

- Implemented modifying reminders on iOS

## 6.6.1

### Fixed

- Serialization error for calendar events on iOS

## 6.6.0

### Fixed

- Not being able to read event color
- Not being able to read events timezone
- Error when creating event

### Added

- Color to calendar object
- Modify events programmatically
- Modify events with prompt
- Method for fetching available calendar sources on iOS

### Removed

- The plugin will not receive updates for capacitor 5

## 6.5.0

### Changed

- Added URL and notes to create options in `createEvent` and `createEventWithPrompt`
- Added the ability to set multiple alarms for creating events in `createEvent` and `createEventWithPrompt`

### Fixed

- `requestFullCalendarAccess` on Android was not functional

## 6.4.1

### Changed

- Returning null in `getDefaultCalendar` when there is no default calendar instead of throwing an error
- Returning null in `getDefaultRemindersList` when there is no default list instead of throwing an error

## 6.4.0

### Added

- New methods to request runtime permissions beside using the permission constants

### Fixed

- `createEventWithPrompt` throwing error because of undefined event id

## 6.3.0

### Added

- Fetch reminders from selected or all reminder lists (iOS)
- Delete reminders by id (iOS)

### Fixed

- Using `isAllDay` with `createEventWithPrompt` on Android was not functional

## 6.2.0

### Added

- Create calendars (iOS)
- Delete calendars (iOS)

### Fixed

- `listCalendars` on Android returning calendar id of type number instead of string
- `createEventWithPrompt` on Android was not using all options
- `createEventWithPrompt` and `selectCalendarsWithPrompt` were throwing error instead of returning empty array on cancel

## 6.1.0

### Changed

- `createEventWithPrompt` accepts options
- Add an alarm for the created events

### Fixed

- Misplaced code in plugin iOS implementation
- Example app missing permissions for contact on iOS 16 and lower
- Permissions documentation on iOS incomplete for iOS 16 and lower

## 6.0.0

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

# Version 5.x.x

Changelogs for the versions supporting Capacitor 5.

## 5.5.0

### Changed

- Added URL and notes to create options in `createEvent` and `createEventWithPrompt`
- Added the ability to set multiple alarms for creating events in `createEvent` and `createEventWithPrompt`

### Fixed

- `requestFullCalendarAccess` on Android was not functional

## 5.4.1

### Changed

- Returning null in `getDefaultCalendar` when there is no default calendar instead of throwing an error
- Returning null in `getDefaultRemindersList` when there is no default list instead of throwing an error

## 5.4.0

### Added

- New methods to request runtime permissions beside using the permission constants

### Fixed

- `createEventWithPrompt` throwing error because of undefined event id

## 5.3.0

### Added

- Fetch reminders from selected or all reminder lists (iOS)
- Delete reminders by id (iOS)

### Fixed

- Using `isAllDay` with `createEventWithPrompt` on Android was not functional

## 5.2.0

### Added

- Create calendars (iOS)
- Delete calendars (iOS)

### Fixed

- `listCalendars` on Android returning calendar id of type number instead of string
- `createEventWithPrompt` on Android was not using all options
- `createEventWithPrompt` and `selectCalendarsWithPrompt` were throwing error instead of returning empty array on cancel

## 5.1.0

### Changed

- `createEventWithPrompt` accepts options
- Add an alarm for the created events

### Fixed

- Misplaced code in plugin iOS implementation
- Example app missing permissions for contact on iOS 16 and lower
- Permissions documentation on iOS incomplete for iOS 16 and lower

## 5.0.0

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
