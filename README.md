<p align="center">
  <img src="assets/images/text-logo.png" alt="capacitor-calendar-logo" height="136"/>
  <br>
  <em>A capacitor plugin for managing calendar events on iOS and Android, with reminders support on iOS.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2025?style=flat-square" />
  <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar">
    <img src="https://img.shields.io/npm/l/@ebarooni/capacitor-calendar?style=flat-square" />
  </a>
  <br>
  <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar">
    <img src="https://img.shields.io/npm/dw/@ebarooni/capacitor-calendar?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar">
    <img src="https://img.shields.io/npm/v/@ebarooni/capacitor-calendar?style=flat-square" />
  </a>
</p>

## Table of Contents

- [Installation](#installation)
- [Demo](#demo)
- [Setup](#setup)
- [Documentation](#documentation)
- [Changelog](#changelog)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install @ebarooni/capacitor-calendar
npx cap sync
```

## Demo

|             iOS 18              |             Android 15              |
| :-----------------------------: | :---------------------------------: |
| ![](./assets/demo/ios-demo.gif) | ![](./assets/demo/android-demo.gif) |

## Setup

This plugin requires additional platform-specific configuration. Follow the official guides:

- **iOS:** [Migrating to the Latest Calendar Access Levels](https://developer.apple.com/documentation/technotes/tn3152-migrating-to-the-latest-calendar-access-levels)
- **Android:** [Calendar Provider User Permissions](https://developer.android.com/identity/providers/calendar-provider#manifest)

## Documentation

For comprehensive usage examples, detailed explanations, and API references, check out:

- **[Online documentation](https://ebarooni.github.io/capacitor-calendar/)**
- **[Type definitions & examples](src/definitions.ts)**

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the latest updates and release history.

> [!NOTE]  
> Version 7.1.0 introduces breaking changes.

## API

<docgen-index>

- [`checkPermission(...)`](#checkpermission)
- [`checkAllPermissions()`](#checkallpermissions)
- [`requestPermission(...)`](#requestpermission)
- [`requestAllPermissions()`](#requestallpermissions)
- [`requestWriteOnlyCalendarAccess()`](#requestwriteonlycalendaraccess)
- [`requestReadOnlyCalendarAccess()`](#requestreadonlycalendaraccess)
- [`requestFullCalendarAccess()`](#requestfullcalendaraccess)
- [`requestFullRemindersAccess()`](#requestfullremindersaccess)
- [`createEventWithPrompt(...)`](#createeventwithprompt)
- [`modifyEventWithPrompt(...)`](#modifyeventwithprompt)
- [`createEvent(...)`](#createevent)
- [`modifyEvent(...)`](#modifyevent)
- [`deleteEventsById(...)`](#deleteeventsbyid)
- [`deleteEvent(...)`](#deleteevent)
- [`deleteEventWithPrompt(...)`](#deleteeventwithprompt)
- [`listEventsInRange(...)`](#listeventsinrange)
- [`commit()`](#commit)
- [`selectCalendarsWithPrompt(...)`](#selectcalendarswithprompt)
- [`fetchAllCalendarSources()`](#fetchallcalendarsources)
- [`listCalendars()`](#listcalendars)
- [`getDefaultCalendar()`](#getdefaultcalendar)
- [`openCalendar(...)`](#opencalendar)
- [`createCalendar(...)`](#createcalendar)
- [`deleteCalendar(...)`](#deletecalendar)
- [`fetchAllRemindersSources()`](#fetchallreminderssources)
- [`openReminders()`](#openreminders)
- [`getDefaultRemindersList()`](#getdefaultreminderslist)
- [`getRemindersLists()`](#getreminderslists)
- [`createReminder(...)`](#createreminder)
- [`deleteRemindersById(...)`](#deleteremindersbyid)
- [`deleteReminder(...)`](#deletereminder)
- [`modifyReminder(...)`](#modifyreminder)
- [`getReminderById(...)`](#getreminderbyid)
- [`getRemindersFromLists(...)`](#getremindersfromlists)
- [Interfaces](#interfaces)
- [Type Aliases](#type-aliases)
- [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermission(...)

```typescript
checkPermission(options: { scope: CalendarPermissionScope; }) => Promise<{ result: PermissionState; }>
```

Retrieves the current permission state for a given scope.

| Param         | Type                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| **`options`** | <code>{ scope: <a href="#calendarpermissionscope">CalendarPermissionScope</a>; }</code> |

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 0.1.0

**Platform:** Android, iOS

---

### checkAllPermissions()

```typescript
checkAllPermissions() => Promise<{ result: CheckAllPermissionsResult; }>
```

Retrieves the current state of all permissions.

**Returns:** <code>Promise&lt;{ result: <a href="#checkallpermissionsresult">CheckAllPermissionsResult</a>; }&gt;</code>

**Since:** 0.1.0

**Platform:** Android, iOS

---

### requestPermission(...)

```typescript
requestPermission(options: { scope: CalendarPermissionScope; }) => Promise<{ result: PermissionState; }>
```

Requests permission for a given scope.

| Param         | Type                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| **`options`** | <code>{ scope: <a href="#calendarpermissionscope">CalendarPermissionScope</a>; }</code> |

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 0.1.0

**Platform:** Android, iOS

---

### requestAllPermissions()

```typescript
requestAllPermissions() => Promise<{ result: RequestAllPermissionsResult; }>
```

Requests permission for all calendar and reminder permissions.

**Returns:** <code>Promise&lt;{ result: <a href="#checkallpermissionsresult">CheckAllPermissionsResult</a>; }&gt;</code>

**Since:** 0.1.0

**Platform:** Android, iOS

---

### requestWriteOnlyCalendarAccess()

```typescript
requestWriteOnlyCalendarAccess() => Promise<{ result: PermissionState; }>
```

Requests write access to the calendar.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

**Platform:** Android, iOS

---

### requestReadOnlyCalendarAccess()

```typescript
requestReadOnlyCalendarAccess() => Promise<{ result: PermissionState; }>
```

Requests read access to the calendar.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

**Platform:** Android

---

### requestFullCalendarAccess()

```typescript
requestFullCalendarAccess() => Promise<{ result: PermissionState; }>
```

Requests read and write access to the calendar.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

**Platform:** Android, iOS

---

### requestFullRemindersAccess()

```typescript
requestFullRemindersAccess() => Promise<{ result: PermissionState; }>
```

Requests read and write access to the reminders.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

**Platform:** iOS

---

### createEventWithPrompt(...)

```typescript
createEventWithPrompt(options?: CreateEventWithPromptOptions | undefined) => Promise<{ id: string | null; }>
```

Opens the system calendar interface to create a new event.
On Android always returns `null`.
Fetch the events to find the ID of the newly created event.

| Param         | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#createeventwithpromptoptions">CreateEventWithPromptOptions</a></code> |

**Returns:** <code>Promise&lt;{ id: string | null; }&gt;</code>

**Since:** 0.1.0

**Platform:** Android, iOS

---

### modifyEventWithPrompt(...)

```typescript
modifyEventWithPrompt(options: ModifyEventWithPromptOptions) => Promise<{ result: EventEditAction | null; }>
```

Opens a system calendar interface to modify an event.
On Android always returns `null`.

| Param         | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#modifyeventwithpromptoptions">ModifyEventWithPromptOptions</a></code> |

**Returns:** <code>Promise&lt;{ result: <a href="#eventeditaction">EventEditAction</a> | null; }&gt;</code>

**Since:** 6.6.0

**Platform:** Android, iOS

---

### createEvent(...)

```typescript
createEvent(options: CreateEventOptions) => Promise<{ id: string; }>
```

Creates an event in the calendar.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#createeventoptions">CreateEventOptions</a></code> |

**Returns:** <code>Promise&lt;{ id: string; }&gt;</code>

**Since:** 0.4.0

**Platform:** iOS, Android

---

### modifyEvent(...)

```typescript
modifyEvent(options: ModifyEventOptions) => Promise<void>
```

Modifies an event.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#modifyeventoptions">ModifyEventOptions</a></code> |

**Since:** 6.6.0

**Platform:** Android, iOS

---

### deleteEventsById(...)

```typescript
deleteEventsById(options: DeleteEventsByIdOptions) => Promise<{ result: DeleteEventsByIdResult; }>
```

Deletes multiple events.

| Param         | Type                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#deleteeventsbyidoptions">DeleteEventsByIdOptions</a></code> |

**Returns:** <code>Promise&lt;{ result: <a href="#deleteeventsbyidresult">DeleteEventsByIdResult</a>; }&gt;</code>

**Since:** 0.11.0

**Platform:** Android, iOS

---

### deleteEvent(...)

```typescript
deleteEvent(options: DeleteEventOptions) => Promise<void>
```

Deletes an event.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#deleteeventoptions">DeleteEventOptions</a></code> |

**Since:** 7.1.0

**Platform:** Android, iOS

---

### deleteEventWithPrompt(...)

```typescript
deleteEventWithPrompt(options: DeleteEventWithPromptOptions) => Promise<{ deleted: boolean; }>
```

Opens a dialog to delete an event.

| Param         | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#deleteeventwithpromptoptions">DeleteEventWithPromptOptions</a></code> |

**Returns:** <code>Promise&lt;{ deleted: boolean; }&gt;</code>

**Since:** 7.1.0

**Platform:** Android, iOS

---

### listEventsInRange(...)

```typescript
listEventsInRange(options: ListEventsInRangeOptions) => Promise<{ result: CalendarEvent[]; }>
```

Retrieves the events within a date range.

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#listeventsinrangeoptions">ListEventsInRangeOptions</a></code> |

**Returns:** <code>Promise&lt;{ result: CalendarEvent[]; }&gt;</code>

**Since:** 0.10.0

**Platform:** Android, iOS

---

### commit()

```typescript
commit() => Promise<void>
```

Save the changes to the calendar.

**Since:** 7.1.0

**Platform:** iOS

---

### selectCalendarsWithPrompt(...)

```typescript
selectCalendarsWithPrompt(options?: SelectCalendarsWithPromptOptions | undefined) => Promise<{ result: Calendar[]; }>
```

Opens a system interface to choose one or multiple calendars.

| Param         | Type                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#selectcalendarswithpromptoptions">SelectCalendarsWithPromptOptions</a></code> |

**Returns:** <code>Promise&lt;{ result: Calendar[]; }&gt;</code>

**Since:** 0.2.0

**Platform:** iOS

---

### fetchAllCalendarSources()

```typescript
fetchAllCalendarSources() => Promise<{ result: CalendarSource[]; }>
```

Retrieves a list of calendar sources.

**Returns:** <code>Promise&lt;{ result: CalendarSource[]; }&gt;</code>

**Since:** 6.6.0

**Platform:** iOS

---

### listCalendars()

```typescript
listCalendars() => Promise<{ result: Calendar[]; }>
```

Retrieves a list of all available calendars.

**Returns:** <code>Promise&lt;{ result: Calendar[]; }&gt;</code>

**Since:** 7.1.0

**Platform:** Android, iOS

---

### getDefaultCalendar()

```typescript
getDefaultCalendar() => Promise<{ result: Calendar | null; }>
```

Retrieves the default calendar.

**Returns:** <code>Promise&lt;{ result: <a href="#calendar">Calendar</a> | null; }&gt;</code>

**Since:** 0.3.0

**Platform:** Android, iOS

---

### openCalendar(...)

```typescript
openCalendar(options?: OpenCalendarOptions | undefined) => Promise<void>
```

Opens the calendar app.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#opencalendaroptions">OpenCalendarOptions</a></code> |

**Since:** 7.1.0

**Platform:** Android, iOS

---

### createCalendar(...)

```typescript
createCalendar(options: CreateCalendarOptions) => Promise<{ id: string; }>
```

Creates a calendar.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#createcalendaroptions">CreateCalendarOptions</a></code> |

**Returns:** <code>Promise&lt;{ id: string; }&gt;</code>

**Since:** 5.2.0

**Platform:** Android, iOS

---

### deleteCalendar(...)

```typescript
deleteCalendar(options: DeleteCalendarOptions) => Promise<void>
```

Deletes a calendar by id.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecalendaroptions">DeleteCalendarOptions</a></code> |

**Since:** 5.2.0

**Platform:** Android, iOS

---

### fetchAllRemindersSources()

```typescript
fetchAllRemindersSources() => Promise<{ result: CalendarSource[]; }>
```

Retrieves a list of calendar sources.

**Returns:** <code>Promise&lt;{ result: CalendarSource[]; }&gt;</code>

**Since:** 6.6.0

**Platform:** iOS

---

### openReminders()

```typescript
openReminders() => Promise<void>
```

Opens the reminders app.

**Since:** 7.1.0

**Platform:** iOS

---

### getDefaultRemindersList()

```typescript
getDefaultRemindersList() => Promise<{ result: RemindersList | null; }>
```

Retrieves the default reminders list.

**Returns:** <code>Promise&lt;{ result: <a href="#calendar">Calendar</a> | null; }&gt;</code>

**Since:** 7.1.0

**Platform:** iOS

---

### getRemindersLists()

```typescript
getRemindersLists() => Promise<{ result: RemindersList[]; }>
```

Retrieves all available reminders lists.

**Returns:** <code>Promise&lt;{ result: Calendar[]; }&gt;</code>

**Since:** 7.1.0

**Platform:** iOS

---

### createReminder(...)

```typescript
createReminder(options: CreateReminderOptions) => Promise<{ id: string; }>
```

Creates a reminder.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#createreminderoptions">CreateReminderOptions</a></code> |

**Returns:** <code>Promise&lt;{ id: string; }&gt;</code>

**Since:** 0.5.0

**Platform:** iOS

---

### deleteRemindersById(...)

```typescript
deleteRemindersById(options: DeleteRemindersByIdOptions) => Promise<{ result: DeleteRemindersByIdResult; }>
```

Deletes multiple reminders.

| Param         | Type                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#deleteremindersbyidoptions">DeleteRemindersByIdOptions</a></code> |

**Returns:** <code>Promise&lt;{ result: <a href="#deleteremindersbyidresult">DeleteRemindersByIdResult</a>; }&gt;</code>

**Since:** 5.3.0

**Platform:** iOS

---

### deleteReminder(...)

```typescript
deleteReminder(options: DeleteReminderOptions) => Promise<void>
```

Deletes a reminder.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletereminderoptions">DeleteReminderOptions</a></code> |

**Since:** 7.1.0

**Platform:** iOS

---

### modifyReminder(...)

```typescript
modifyReminder(options: ModifyReminderOptions) => Promise<void>
```

Modifies a reminder.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#modifyreminderoptions">ModifyReminderOptions</a></code> |

**Since:** 6.7.0

**Platform:** iOS

---

### getReminderById(...)

```typescript
getReminderById(options: GetReminderByIdOptions) => Promise<{ result: Reminder | null; }>
```

Retrieve a reminder by ID.

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#getreminderbyidoptions">GetReminderByIdOptions</a></code> |

**Returns:** <code>Promise&lt;{ result: <a href="#reminder">Reminder</a> | null; }&gt;</code>

**Since:** 7.1.0

**Platform:** iOS

---

### getRemindersFromLists(...)

```typescript
getRemindersFromLists(options: GetRemindersFromListsOptions) => Promise<{ result: Reminder[]; }>
```

Retrieves reminders from multiple lists.

| Param         | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#getremindersfromlistsoptions">GetRemindersFromListsOptions</a></code> |

**Returns:** <code>Promise&lt;{ result: Reminder[]; }&gt;</code>

**Since:** 5.3.0

**Platform:** iOS

---

### Interfaces

#### CreateEventWithPromptOptions

| Prop               | Type                                                            | Description                                                                                        | Since | Platform     |
| ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----- | ------------ |
| **`title`**        | <code>string</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`calendarId`**   | <code>string</code>                                             |                                                                                                    | 0.1.0 | iOS          |
| **`location`**     | <code>string</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`startDate`**    | <code>number</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`endDate`**      | <code>number</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`isAllDay`**     | <code>boolean</code>                                            |                                                                                                    | 0.1.0 | Android, iOS |
| **`alerts`**       | <code>number[]</code>                                           | Sets alerts before or after the start of the event in minutes. On iOS only 2 alerts are supported. | 7.1.0 | iOS          |
| **`url`**          | <code>string</code>                                             |                                                                                                    | 0.1.0 | iOS          |
| **`description`**  | <code>string</code>                                             |                                                                                                    | 7.1.0 | Android, iOS |
| **`availability`** | <code><a href="#eventavailability">EventAvailability</a></code> |                                                                                                    | 7.1.0 | Android, iOS |
| **`invitees`**     | <code>string[]</code>                                           | An array of emails to invite.                                                                      | 7.1.0 | Android      |

#### ModifyEventWithPromptOptions

| Prop               | Type                                                            | Description                                                                                        | Since | Platform     |
| ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----- | ------------ |
| **`title`**        | <code>string</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`calendarId`**   | <code>string</code>                                             |                                                                                                    | 0.1.0 | iOS          |
| **`location`**     | <code>string</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`startDate`**    | <code>number</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`endDate`**      | <code>number</code>                                             |                                                                                                    | 0.1.0 | Android, iOS |
| **`isAllDay`**     | <code>boolean</code>                                            |                                                                                                    | 0.1.0 | Android, iOS |
| **`alerts`**       | <code>number[]</code>                                           | Sets alerts before or after the start of the event in minutes. On iOS only 2 alerts are supported. | 7.1.0 | iOS          |
| **`url`**          | <code>string</code>                                             |                                                                                                    | 0.1.0 | iOS          |
| **`description`**  | <code>string</code>                                             |                                                                                                    | 7.1.0 | Android, iOS |
| **`availability`** | <code><a href="#eventavailability">EventAvailability</a></code> |                                                                                                    | 7.1.0 | Android, iOS |
| **`invitees`**     | <code>string[]</code>                                           | An array of emails to invite.                                                                      | 7.1.0 | Android      |
| **`id`**           | <code>string</code>                                             | The ID of the event to be modified.                                                                | 7.1.0 | Android, iOS |

#### CreateEventOptions

| Prop               | Type                                                            | Description                                                                | Default           | Since | Platform     |
| ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------- | ----- | ------------ |
| **`title`**        | <code>string</code>                                             |                                                                            |                   | 0.4.0 | Android, iOS |
| **`calendarId`**   | <code>string</code>                                             |                                                                            |                   | 0.1.0 | Android, iOS |
| **`location`**     | <code>string</code>                                             |                                                                            |                   | 0.1.0 | Android, iOS |
| **`startDate`**    | <code>number</code>                                             |                                                                            |                   | 0.1.0 | Android, iOS |
| **`endDate`**      | <code>number</code>                                             |                                                                            |                   | 0.1.0 | Android, iOS |
| **`isAllDay`**     | <code>boolean</code>                                            |                                                                            |                   | 0.1.0 | Android, iOS |
| **`alerts`**       | <code>number[]</code>                                           |                                                                            |                   | 7.1.0 | Android, iOS |
| **`url`**          | <code>string</code>                                             |                                                                            |                   | 0.1.0 | iOS          |
| **`description`**  | <code>string</code>                                             |                                                                            |                   | 7.1.0 | Android, iOS |
| **`availability`** | <code><a href="#eventavailability">EventAvailability</a></code> |                                                                            |                   | 7.1.0 | Android, iOS |
| **`organizer`**    | <code>string</code>                                             | Email of the event organizer.                                              |                   | 7.1.0 | Android      |
| **`color`**        | <code>string</code>                                             |                                                                            |                   | 7.1.0 | Android      |
| **`duration`**     | <code>string</code>                                             | Duration of the event in RFC2445 format.                                   |                   | 7.1.0 | Android      |
| **`commit`**       | <code>boolean</code>                                            | Whether to save immediately (`true`) or batch changes for later (`false`). | <code>true</code> | 7.1.0 | iOS          |
| **`attendees`**    | <code>EventGuest[]</code>                                       | The event guests.                                                          |                   | 7.1.0 | Android      |

#### EventGuest

| Prop        | Type                | Since |
| ----------- | ------------------- | ----- |
| **`name`**  | <code>string</code> | 7.1.0 |
| **`email`** | <code>string</code> | 7.1.0 |

#### ModifyEventOptions

| Prop               | Type                                                            | Description                              | Default                           | Since | Platform     |
| ------------------ | --------------------------------------------------------------- | ---------------------------------------- | --------------------------------- | ----- | ------------ |
| **`id`**           | <code>string</code>                                             | The ID of the event to be modified.      |                                   | 7.1.0 | Android, iOS |
| **`title`**        | <code>string</code>                                             |                                          |                                   | 0.4.0 | Android, iOS |
| **`calendarId`**   | <code>string</code>                                             |                                          |                                   | 0.1.0 | Android, iOS |
| **`location`**     | <code>string</code>                                             |                                          |                                   | 0.1.0 | Android, iOS |
| **`startDate`**    | <code>number</code>                                             |                                          |                                   | 0.1.0 | Android, iOS |
| **`endDate`**      | <code>number</code>                                             |                                          |                                   | 0.1.0 | Android, iOS |
| **`isAllDay`**     | <code>boolean</code>                                            |                                          |                                   | 0.1.0 | Android, iOS |
| **`alerts`**       | <code>number[]</code>                                           |                                          |                                   | 7.1.0 | Android, iOS |
| **`url`**          | <code>string</code>                                             |                                          |                                   | 0.1.0 | iOS          |
| **`description`**  | <code>string</code>                                             |                                          |                                   | 7.1.0 | Android, iOS |
| **`availability`** | <code><a href="#eventavailability">EventAvailability</a></code> |                                          |                                   | 7.1.0 | Android, iOS |
| **`organizer`**    | <code>string</code>                                             | Email of the event organizer.            |                                   | 7.1.0 | Android      |
| **`color`**        | <code>string</code>                                             |                                          |                                   | 7.1.0 | Android      |
| **`duration`**     | <code>string</code>                                             | Duration of the event in RFC2445 format. |                                   | 7.1.0 | Android      |
| **`attendees`**    | <code>EventGuest[]</code>                                       | The event guests.                        |                                   | 7.1.0 | Android      |
| **`span`**         | <code><a href="#eventspan">EventSpan</a></code>                 | The span of modifications.               | <code>EventSpan.THIS_EVENT</code> |       | iOS          |

#### DeleteEventsByIdResult

| Prop          | Type                  | Since |
| ------------- | --------------------- | ----- |
| **`deleted`** | <code>string[]</code> | 7.1.0 |
| **`failed`**  | <code>string[]</code> | 7.1.0 |

#### DeleteEventsByIdOptions

| Prop       | Type                                            | Description           | Default                           | Since | Platform |
| ---------- | ----------------------------------------------- | --------------------- | --------------------------------- | ----- | -------- |
| **`ids`**  | <code>string[]</code>                           |                       |                                   | 7.1.0 |          |
| **`span`** | <code><a href="#eventspan">EventSpan</a></code> | The span of deletion. | <code>EventSpan.THIS_EVENT</code> |       | iOS      |

#### DeleteEventOptions

| Prop       | Type                                            | Description           | Default                           | Since | Platform |
| ---------- | ----------------------------------------------- | --------------------- | --------------------------------- | ----- | -------- |
| **`id`**   | <code>string</code>                             |                       |                                   | 7.1.0 |          |
| **`span`** | <code><a href="#eventspan">EventSpan</a></code> | The span of deletion. | <code>EventSpan.THIS_EVENT</code> |       | iOS      |

#### DeleteEventWithPromptOptions

| Prop                    | Type                                            | Description                         | Default                           | Since | Platform     |
| ----------------------- | ----------------------------------------------- | ----------------------------------- | --------------------------------- | ----- | ------------ |
| **`id`**                | <code>string</code>                             |                                     |                                   | 7.1.0 |              |
| **`span`**              | <code><a href="#eventspan">EventSpan</a></code> | The span of deletion.               | <code>EventSpan.THIS_EVENT</code> |       | iOS          |
| **`title`**             | <code>string</code>                             | Title of the dialog.                |                                   | 7.1.0 | Android, iOS |
| **`message`**           | <code>string</code>                             | Message of the dialog.              |                                   | 7.1.0 | Android, iOS |
| **`confirmButtonText`** | <code>string</code>                             | Text to show on the confirm button. | <code>'Delete'</code>             | 7.1.0 | Android, iOS |
| **`cancelButtonText`**  | <code>string</code>                             | Text to show on the cancel button.  | <code>'Cancel'</code>             | 7.1.0 | Android, iOS |

#### CalendarEvent

| Prop                            | Type                                                                                                                                                                                                                                          | Since | Platform     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------ |
| **`id`**                        | <code>string</code>                                                                                                                                                                                                                           | 7.1.0 | Android, iOS |
| **`title`**                     | <code>string</code>                                                                                                                                                                                                                           | 7.1.0 | Android, iOS |
| **`calendarId`**                | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | Android, iOS |
| **`location`**                  | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | Android, iOS |
| **`startDate`**                 | <code>number</code>                                                                                                                                                                                                                           | 7.1.0 | Android, iOS |
| **`endDate`**                   | <code>number</code>                                                                                                                                                                                                                           | 7.1.0 | Android, iOS |
| **`isAllDay`**                  | <code>boolean</code>                                                                                                                                                                                                                          | 7.1.0 | Android, iOS |
| **`alerts`**                    | <code>number[]</code>                                                                                                                                                                                                                         | 7.1.0 | Android, iOS |
| **`url`**                       | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | iOS          |
| **`description`**               | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | Android, iOS |
| **`availability`**              | <code><a href="#eventavailability">EventAvailability</a> \| null</code>                                                                                                                                                                       | 7.1.0 | Android, iOS |
| **`organizer`**                 | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | Android, iOS |
| **`color`**                     | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | Android, iOS |
| **`duration`**                  | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | Android      |
| **`isDetached`**                | <code>boolean \| null</code>                                                                                                                                                                                                                  | 7.1.0 | iOS          |
| **`birthdayContactIdentifier`** | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | iOS          |
| **`status`**                    | <code><a href="#eventstatus">EventStatus</a> \| null</code>                                                                                                                                                                                   | 7.1.0 | Android, iOS |
| **`creationDate`**              | <code>number \| null</code>                                                                                                                                                                                                                   | 7.1.0 | iOS          |
| **`lastModifiedDate`**          | <code>number \| null</code>                                                                                                                                                                                                                   | 7.1.0 | iOS          |
| **`attendees`**                 | <code>{ email: string \| null; name: string \| null; role: <a href="#attendeerole">AttendeeRole</a> \| null; status: <a href="#attendeestatus">AttendeeStatus</a> \| null; type: <a href="#attendeetype">AttendeeType</a> \| null; }[]</code> | 7.1.0 | Android, iOS |
| **`timezone`**                  | <code>string \| null</code>                                                                                                                                                                                                                   | 7.1.0 | Android, iOS |

#### ListEventsInRangeOptions

| Prop       | Type                | Description                    | Since |
| ---------- | ------------------- | ------------------------------ | ----- |
| **`from`** | <code>number</code> | The timestamp in milliseconds. | 7.1.0 |
| **`to`**   | <code>number</code> | The timestamp in milliseconds. | 7.1.0 |

#### Calendar

| Prop                             | Type                                                              | Description                                                        | Since | Platform     |
| -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ | ----- | ------------ |
| **`id`**                         | <code>string</code>                                               |                                                                    | 7.1.0 | Android, iOS |
| **`title`**                      | <code>string</code>                                               |                                                                    | 7.1.0 | Android, iOS |
| **`internalTitle`**              | <code>string \| null</code>                                       | Internal name of the calendar (`CalendarContract.Calendars.NAME`). | 7.1.0 | Android      |
| **`color`**                      | <code>string</code>                                               |                                                                    | 7.1.0 | Android, iOS |
| **`isImmutable`**                | <code>boolean \| null</code>                                      |                                                                    | 7.1.0 | iOS          |
| **`allowsContentModifications`** | <code>boolean \| null</code>                                      |                                                                    | 7.1.0 | iOS          |
| **`type`**                       | <code><a href="#calendartype">CalendarType</a> \| null</code>     |                                                                    | 7.1.0 | iOS          |
| **`isSubscribed`**               | <code>boolean \| null</code>                                      |                                                                    | 7.1.0 | iOS          |
| **`source`**                     | <code><a href="#calendarsource">CalendarSource</a> \| null</code> |                                                                    | 7.1.0 | iOS          |
| **`visible`**                    | <code>boolean \| null</code>                                      | Indicates if the events from this calendar should be shown.        | 7.1.0 | Android      |
| **`accountName`**                | <code>string \| null</code>                                       | The account under which the calendar is registered.                | 7.1.0 | Android      |
| **`ownerAccount`**               | <code>string \| null</code>                                       | The owner of the calendar.                                         | 7.1.0 | Android      |
| **`maxReminders`**               | <code>number \| null</code>                                       | Maximum number of reminders allowed per event.                     | 7.1.0 | Android      |
| **`location`**                   | <code>string \| null</code>                                       |                                                                    | 7.1.0 | Android      |

#### CalendarSource

| Prop        | Type                                                              | Since |
| ----------- | ----------------------------------------------------------------- | ----- |
| **`type`**  | <code><a href="#calendarsourcetype">CalendarSourceType</a></code> | 7.1.0 |
| **`id`**    | <code>string</code>                                               | 7.1.0 |
| **`title`** | <code>string</code>                                               | 7.1.0 |

#### SelectCalendarsWithPromptOptions

| Prop               | Type                                                                                | Description                | Default                                                | Since |
| ------------------ | ----------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------ | ----- |
| **`displayStyle`** | <code><a href="#calendarchooserdisplaystyle">CalendarChooserDisplayStyle</a></code> |                            | <code>CalendarChooserDisplayStyle.ALL_CALENDARS</code> | 7.1.0 |
| **`multiple`**     | <code>boolean</code>                                                                | Allow multiple selections. | <code>false</code>                                     | 7.1.0 |

#### OpenCalendarOptions

| Prop       | Type                | Default                 | Since |
| ---------- | ------------------- | ----------------------- | ----- |
| **`date`** | <code>number</code> | <code>Date.now()</code> | 7.1.0 |

#### CreateCalendarOptions

| Prop               | Type                | Description                                                | Since | Platform     |
| ------------------ | ------------------- | ---------------------------------------------------------- | ----- | ------------ |
| **`title`**        | <code>string</code> |                                                            | 5.2.0 | Android, iOS |
| **`color`**        | <code>string</code> | The color of the calendar. Should be provided on Android.  | 5.2.0 | Android, iOS |
| **`sourceId`**     | <code>string</code> |                                                            | 5.2.0 | iOS          |
| **`accountName`**  | <code>string</code> | Only needed on Android. Typically set to an email address. | 7.1.0 | Android      |
| **`ownerAccount`** | <code>string</code> | Only needed on Android. Typically set to an email address. | 7.1.0 | Android      |

#### DeleteCalendarOptions

| Prop     | Type                | Since |
| -------- | ------------------- | ----- |
| **`id`** | <code>string</code> | 7.1.0 |

#### CreateReminderOptions

| Prop                 | Type                                                      | Since |
| -------------------- | --------------------------------------------------------- | ----- |
| **`title`**          | <code>string</code>                                       | 7.1.0 |
| **`listId`**         | <code>string</code>                                       | 7.1.0 |
| **`priority`**       | <code>number</code>                                       | 7.1.0 |
| **`isCompleted`**    | <code>boolean</code>                                      | 7.1.0 |
| **`startDate`**      | <code>number</code>                                       | 7.1.0 |
| **`dueDate`**        | <code>number</code>                                       | 7.1.0 |
| **`completionDate`** | <code>number</code>                                       | 7.1.0 |
| **`notes`**          | <code>string</code>                                       | 7.1.0 |
| **`url`**            | <code>string</code>                                       | 7.1.0 |
| **`location`**       | <code>string</code>                                       | 7.1.0 |
| **`recurrence`**     | <code><a href="#recurrencerule">RecurrenceRule</a></code> | 7.1.0 |
| **`alerts`**         | <code>number[]</code>                                     | 7.1.0 |

#### RecurrenceRule

| Prop            | Type                                                                | Description                                                                        | Since |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----- |
| **`frequency`** | <code><a href="#recurrencefrequency">RecurrenceFrequency</a></code> |                                                                                    | 7.1.0 |
| **`interval`**  | <code>number</code>                                                 | How often it repeats (e.g. 1 for every occurrence, 2 for every second occurrence). | 7.1.0 |
| **`end`**       | <code>number</code>                                                 | Timestamp of when the recurrence ends.                                             | 7.1.0 |

#### DeleteRemindersByIdResult

| Prop          | Type                  | Since |
| ------------- | --------------------- | ----- |
| **`deleted`** | <code>string[]</code> | 7.1.0 |
| **`failed`**  | <code>string[]</code> | 7.1.0 |

#### DeleteRemindersByIdOptions

| Prop      | Type                  | Since |
| --------- | --------------------- | ----- |
| **`ids`** | <code>string[]</code> | 7.1.0 |

#### DeleteReminderOptions

| Prop     | Type                | Since |
| -------- | ------------------- | ----- |
| **`id`** | <code>string</code> | 7.1.0 |

#### ModifyReminderOptions

| Prop                 | Type                                                      | Since |
| -------------------- | --------------------------------------------------------- | ----- |
| **`id`**             | <code>string</code>                                       | 7.1.0 |
| **`title`**          | <code>string</code>                                       | 7.1.0 |
| **`listId`**         | <code>string</code>                                       | 7.1.0 |
| **`priority`**       | <code>number</code>                                       | 7.1.0 |
| **`isCompleted`**    | <code>boolean</code>                                      | 7.1.0 |
| **`startDate`**      | <code>number</code>                                       | 7.1.0 |
| **`dueDate`**        | <code>number</code>                                       | 7.1.0 |
| **`completionDate`** | <code>number</code>                                       | 7.1.0 |
| **`notes`**          | <code>string</code>                                       | 7.1.0 |
| **`url`**            | <code>string</code>                                       | 7.1.0 |
| **`location`**       | <code>string</code>                                       | 7.1.0 |
| **`recurrence`**     | <code><a href="#recurrencerule">RecurrenceRule</a></code> | 7.1.0 |
| **`alerts`**         | <code>number[]</code>                                     | 7.1.0 |

#### Reminder

| Prop                 | Type                          | Since |
| -------------------- | ----------------------------- | ----- |
| **`id`**             | <code>string</code>           | 7.1.0 |
| **`title`**          | <code>string \| null</code>   | 7.1.0 |
| **`listId`**         | <code>string \| null</code>   | 7.1.0 |
| **`isCompleted`**    | <code>boolean</code>          | 7.1.0 |
| **`priority`**       | <code>number \| null</code>   | 7.1.0 |
| **`notes`**          | <code>string \| null</code>   | 7.1.0 |
| **`location`**       | <code>string \| null</code>   | 7.1.0 |
| **`url`**            | <code>string \| null</code>   | 7.1.0 |
| **`startDate`**      | <code>number \| null</code>   | 7.1.0 |
| **`dueDate`**        | <code>number \| null</code>   | 7.1.0 |
| **`completionDate`** | <code>number \| null</code>   | 7.1.0 |
| **`recurrence`**     | <code>RecurrenceRule[]</code> | 7.1.0 |
| **`alerts`**         | <code>number[]</code>         | 7.1.0 |

#### GetReminderByIdOptions

| Prop     | Type                | Since |
| -------- | ------------------- | ----- |
| **`id`** | <code>string</code> | 7.1.0 |

#### GetRemindersFromListsOptions

| Prop          | Type                  | Since |
| ------------- | --------------------- | ----- |
| **`listIds`** | <code>string[]</code> | 7.1.0 |

### Type Aliases

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### CheckAllPermissionsResult

<code><a href="#record">Record</a>&lt; <a href="#calendarpermissionscope">CalendarPermissionScope</a>, <a href="#permissionstate">PermissionState</a> &gt;</code>

#### Record

Construct a type with a set of properties K of type T

<code>{
[P in K]: T;
}</code>

#### RequestAllPermissionsResult

<code><a href="#checkallpermissionsresult">CheckAllPermissionsResult</a></code>

#### EventEditAction

<code>"canceled" | "saved" | "deleted"</code>

#### RemindersList

<code><a href="#calendar">Calendar</a></code>

### Enums

#### CalendarPermissionScope

| Members               | Value                         | Description                                                  | Since | Platform     |
| --------------------- | ----------------------------- | ------------------------------------------------------------ | ----- | ------------ |
| **`READ_CALENDAR`**   | <code>"readCalendar"</code>   | Permission required for reading calendar events.             | 7.1.0 | Android, iOS |
| **`READ_REMINDERS`**  | <code>"readReminders"</code>  | Permission required for reading reminders.                   | 7.1.0 | iOS          |
| **`WRITE_CALENDAR`**  | <code>"writeCalendar"</code>  | Permission required for adding or modifying calendar events. | 7.1.0 | Android, iOS |
| **`WRITE_REMINDERS`** | <code>"writeReminders"</code> | Permission required for adding or modifying reminders.       | 7.1.0 | iOS          |

#### EventAvailability

| Members             | Value           | Since | Platform     |
| ------------------- | --------------- | ----- | ------------ |
| **`NOT_SUPPORTED`** | <code>-1</code> | 7.1.0 | iOS          |
| **`BUSY`**          |                 | 7.1.0 | Android, iOS |
| **`FREE`**          |                 | 7.1.0 | Android, iOS |
| **`TENTATIVE`**     |                 | 7.1.0 | Android, iOS |
| **`UNAVAILABLE`**   |                 | 7.1.0 | iOS          |

#### EventSpan

| Members                      | Since |
| ---------------------------- | ----- |
| **`THIS_EVENT`**             | 7.1.0 |
| **`THIS_AND_FUTURE_EVENTS`** | 7.1.0 |

#### EventStatus

| Members         | Value                    | Since | Platform     |
| --------------- | ------------------------ | ----- | ------------ |
| **`NONE`**      | <code>"none"</code>      | 7.1.0 | iOS          |
| **`CONFIRMED`** | <code>"confirmed"</code> | 7.1.0 | Android, iOS |
| **`TENTATIVE`** | <code>"tentative"</code> | 7.1.0 | Android, iOS |
| **`CANCELED`**  | <code>"canceled"</code>  | 7.1.0 | Android, iOS |

#### AttendeeRole

| Members               | Value                         | Since | Platform     |
| --------------------- | ----------------------------- | ----- | ------------ |
| **`UNKNOWN`**         | <code>"unknown"</code>        | 7.1.0 | Android, iOS |
| **`REQUIRED`**        | <code>"required"</code>       | 7.1.0 | iOS          |
| **`OPTIONAL`**        | <code>"optional"</code>       | 7.1.0 | iOS          |
| **`CHAIR`**           | <code>"chair"</code>          | 7.1.0 | iOS          |
| **`NON_PARTICIPANT`** | <code>"nonParticipant"</code> | 7.1.0 | Android, iOS |
| **`ATTENDEE`**        | <code>"attendee"</code>       | 7.1.0 | Android      |
| **`ORGANIZER`**       | <code>"organizer"</code>      | 7.1.0 | Android      |
| **`PERFORMER`**       | <code>"performer"</code>      | 7.1.0 | Android      |
| **`SPEAKER`**         | <code>"speaker"</code>        | 7.1.0 | Android      |

#### AttendeeStatus

| Members          | Value                    | Since | Platform     |
| ---------------- | ------------------------ | ----- | ------------ |
| **`NONE`**       | <code>"none"</code>      | 7.1.0 | Android      |
| **`ACCEPTED`**   | <code>"accepted"</code>  | 7.1.0 | Android, iOS |
| **`DECLINED`**   | <code>"declined"</code>  | 7.1.0 | Android, iOS |
| **`INVITED`**    | <code>"invited"</code>   | 7.1.0 | Android      |
| **`UNKNOWN`**    | <code>"unknown"</code>   | 7.1.0 | iOS          |
| **`PENDING`**    | <code>"pending"</code>   | 7.1.0 | iOS          |
| **`TENTATIVE`**  | <code>"tentative"</code> | 7.1.0 | Android, iOS |
| **`DELEGATED`**  | <code>"delegated"</code> | 7.1.0 | iOS          |
| **`COMPLETED`**  | <code>"completed"</code> | 7.1.0 | iOS          |
| **`IN_PROCESS`** | <code>"inProcess"</code> | 7.1.0 | iOS          |

#### AttendeeType

| Members        | Value                   | Since | Platform     |
| -------------- | ----------------------- | ----- | ------------ |
| **`UNKNOWN`**  | <code>"unknown"</code>  | 7.1.0 | Android, iOS |
| **`PERSON`**   | <code>"person"</code>   | 7.1.0 | iOS          |
| **`ROOM`**     | <code>"room"</code>     | 7.1.0 | iOS          |
| **`RESOURCE`** | <code>"resource"</code> | 7.1.0 | Android, iOS |
| **`GROUP`**    | <code>"group"</code>    | 7.1.0 | iOS          |
| **`REQUIRED`** | <code>"required"</code> | 7.1.0 | Android      |
| **`NONE`**     | <code>"none"</code>     | 7.1.0 | Android      |
| **`OPTIONAL`** | <code>"optional"</code> | 7.1.0 | Android      |

#### CalendarType

| Members            | Since |
| ------------------ | ----- |
| **`LOCAL`**        | 7.1.0 |
| **`CAL_DAV`**      | 7.1.0 |
| **`EXCHANGE`**     | 7.1.0 |
| **`SUBSCRIPTION`** | 7.1.0 |
| **`BIRTHDAY`**     | 7.1.0 |

#### CalendarSourceType

| Members          | Since |
| ---------------- | ----- |
| **`LOCAL`**      | 7.1.0 |
| **`EXCHANGE`**   | 7.1.0 |
| **`CAL_DAV`**    | 7.1.0 |
| **`MOBILE_ME`**  | 7.1.0 |
| **`SUBSCRIBED`** | 7.1.0 |
| **`BIRTHDAYS`**  | 7.1.0 |

#### CalendarChooserDisplayStyle

| Members                       | Since |
| ----------------------------- | ----- |
| **`ALL_CALENDARS`**           | 0.2.0 |
| **`WRITABLE_CALENDARS_ONLY`** | 0.2.0 |

#### RecurrenceFrequency

| Members       | Since |
| ------------- | ----- |
| **`DAILY`**   | 7.1.0 |
| **`WEEKLY`**  | 7.1.0 |
| **`MONTHLY`** | 7.1.0 |
| **`YEARLY`**  | 7.1.0 |

</docgen-api>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
