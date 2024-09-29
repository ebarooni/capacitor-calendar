## API

<docgen-index>

- [`checkPermission(...)`](#checkpermission)
- [`checkAllPermissions()`](#checkallpermissions)
- [`requestPermission(...)`](#requestpermission)
- [`requestAllPermissions()`](#requestallpermissions)
- [`createEventWithPrompt(...)`](#createeventwithprompt)
- [`selectCalendarsWithPrompt(...)`](#selectcalendarswithprompt)
- [`listCalendars()`](#listcalendars)
- [`getDefaultCalendar()`](#getdefaultcalendar)
- [`createEvent(...)`](#createevent)
- [`getDefaultRemindersList()`](#getdefaultreminderslist)
- [`getRemindersLists()`](#getreminderslists)
- [`createReminder(...)`](#createreminder)
- [`openCalendar(...)`](#opencalendar)
- [`openReminders()`](#openreminders)
- [`listEventsInRange(...)`](#listeventsinrange)
- [`deleteEventsById(...)`](#deleteeventsbyid)
- [`deleteEventById(...)`](#deleteeventbyid)
- [`createCalendar(...)`](#createcalendar)
- [`deleteCalendar(...)`](#deletecalendar)
- [`getRemindersFromLists(...)`](#getremindersfromlists)
- [`deleteRemindersById(...)`](#deleteremindersbyid)
- [`requestWriteOnlyCalendarAccess()`](#requestwriteonlycalendaraccess)
- [`requestReadOnlyCalendarAccess()`](#requestreadonlycalendaraccess)
- [`requestFullCalendarAccess()`](#requestfullcalendaraccess)
- [`requestFullRemindersAccess()`](#requestfullremindersaccess)
- [`modifyEventWithPrompt(...)`](#modifyeventwithprompt)
- [`modifyEvent(...)`](#modifyevent)
- [`fetchAllCalendarSources()`](#fetchallcalendarsources)
- [`fetchAllRemindersSources()`](#fetchallreminderssources)
- [`modifyReminder(...)`](#modifyreminder)
- [Interfaces](#interfaces)
- [Type Aliases](#type-aliases)
- [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermission(...)

```typescript
checkPermission(options: { alias: PluginPermission; }) => Promise<{ result: PermissionState; }>
```

Checks the current authorization status of a specific permission.

| Param         | Type                                                                      | Description                               |
| ------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| **`options`** | <code>{ alias: <a href="#pluginpermission">PluginPermission</a>; }</code> | An object with the name of the permission |

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 0.1.0

---

### checkAllPermissions()

```typescript
checkAllPermissions() => Promise<PluginPermissionsMap>
```

Checks the current authorization status of all the required permissions for the plugin.

**Returns:** <code>Promise&lt;<a href="#pluginpermissionsmap">PluginPermissionsMap</a>&gt;</code>

**Since:** 0.1.0

---

### requestPermission(...)

```typescript
requestPermission(options: { alias: PluginPermission; }) => Promise<{ result: PermissionState; }>
```

Requests authorization to a specific permission, if not already granted.
If the permission is already granted, it will directly return the status.

| Param         | Type                                                                      | Description                               |
| ------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| **`options`** | <code>{ alias: <a href="#pluginpermission">PluginPermission</a>; }</code> | An object with the name of the permission |

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 0.1.0

---

### requestAllPermissions()

```typescript
requestAllPermissions() => Promise<PluginPermissionsMap>
```

Requests authorization to all the required permissions for the plugin, if they have not already been granted.

**Returns:** <code>Promise&lt;<a href="#pluginpermissionsmap">PluginPermissionsMap</a>&gt;</code>

**Since:** 0.1.0

---

### createEventWithPrompt(...)

```typescript
createEventWithPrompt(options: { title: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number | number[]; url?: string; notes?: string; eventIdOptional?: boolean; recurrence?: ReminderRecurrenceRule; }) => Promise<{ result: string[]; }>
```

Creates an event in the calendar by using the native calendar.
On iOS opens a native sheet and on Android opens an intent.

| Param         | Type                                                                                                                                                                                                                                                                                                             | Description                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **`options`** | <code>{ title: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number \| number[]; url?: string; notes?: string; eventIdOptional?: boolean; recurrence?: <a href="#reminderrecurrencerule">ReminderRecurrenceRule</a>; }</code> | Options for creating the event. |

**Returns:** <code>Promise&lt;{ result: string[]; }&gt;</code>

**Since:** 0.1.0

---

### selectCalendarsWithPrompt(...)

```typescript
selectCalendarsWithPrompt(options: { displayStyle: CalendarChooserDisplayStyle; selectionStyle: CalendarChooserSelectionStyle; }) => Promise<{ result: Calendar[]; }>
```

Presents a prompt to the user to select calendars. This method is available only on iOS.

| Param         | Type                                                                                                                                                                                               | Description                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code>{ displayStyle: <a href="#calendarchooserdisplaystyle">CalendarChooserDisplayStyle</a>; selectionStyle: <a href="#calendarchooserselectionstyle">CalendarChooserSelectionStyle</a>; }</code> | - Options for customizing the display and selection styles of the calendar chooser. |

**Returns:** <code>Promise&lt;{ result: Calendar[]; }&gt;</code>

**Since:** 0.2.0

---

### listCalendars()

```typescript
listCalendars() => Promise<{ result: Calendar[]; }>
```

Retrieves a list of calendars available on the device.

**Returns:** <code>Promise&lt;{ result: Calendar[]; }&gt;</code>

---

### getDefaultCalendar()

```typescript
getDefaultCalendar() => Promise<{ result: Calendar | null; }>
```

Retrieves the default calendar set on the device.

**Returns:** <code>Promise&lt;{ result: <a href="#calendar">Calendar</a> | null; }&gt;</code>

**Since:** 0.3.0

---

### createEvent(...)

```typescript
createEvent(options: { title: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number | number[]; url?: string; notes?: string; recurrence?: ReminderRecurrenceRule; }) => Promise<{ result: string; }>
```

Creates an event with the provided options.

| Param         | Type                                                                                                                                                                                                                                                                                  | Description                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **`options`** | <code>{ title: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number \| number[]; url?: string; notes?: string; recurrence?: <a href="#reminderrecurrencerule">ReminderRecurrenceRule</a>; }</code> | Options for creating the event. |

**Returns:** <code>Promise&lt;{ result: string; }&gt;</code>

**Since:** 0.4.0

---

### getDefaultRemindersList()

```typescript
getDefaultRemindersList() => Promise<{ result: RemindersList; }>
```

Retrieves the default reminders list set on the device.

**Returns:** <code>Promise&lt;{ result: <a href="#reminderslist">RemindersList</a>; }&gt;</code>

---

### getRemindersLists()

```typescript
getRemindersLists() => Promise<{ result: RemindersList[]; }>
```

Retrieves all available reminders lists on the device.

**Returns:** <code>Promise&lt;{ result: RemindersList[]; }&gt;</code>

---

### createReminder(...)

```typescript
createReminder(options: { title: string; listId?: string; priority?: number; isCompleted?: boolean; startDate?: number; dueDate?: number; completionDate?: number; notes?: string; url?: string; location?: string; recurrence?: ReminderRecurrenceRule; }) => Promise<{ result: string; }>
```

Creates a reminder with the provided options.

| Param         | Type                                                                                                                                                                                                                                                                                  | Description                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **`options`** | <code>{ title: string; listId?: string; priority?: number; isCompleted?: boolean; startDate?: number; dueDate?: number; completionDate?: number; notes?: string; url?: string; location?: string; recurrence?: <a href="#reminderrecurrencerule">ReminderRecurrenceRule</a>; }</code> | - Options for creating the reminder. |

**Returns:** <code>Promise&lt;{ result: string; }&gt;</code>

**Since:** 0.5.0

---

### openCalendar(...)

```typescript
openCalendar(options: { date?: number; }) => Promise<void>
```

Opens the calendar app. Since the user leaves your app, use this method with caution.
It will open the calendar on today's date if no date is provided.

| Param         | Type                            | Description                         |
| ------------- | ------------------------------- | ----------------------------------- |
| **`options`** | <code>{ date?: number; }</code> | - Options for opening the calendar. |

---

### openReminders()

```typescript
openReminders() => Promise<void>
```

Opens the reminders app. Since the user leaves your app, use this method with caution.

---

### listEventsInRange(...)

```typescript
listEventsInRange(options: { startDate: number; endDate: number; }) => Promise<{ result: CalendarEvent[]; }>
```

Retrieves the list of calendar events present in the given date range.

| Param         | Type                                                 | Description                          |
| ------------- | ---------------------------------------------------- | ------------------------------------ |
| **`options`** | <code>{ startDate: number; endDate: number; }</code> | Options for defining the date range. |

**Returns:** <code>Promise&lt;{ result: CalendarEvent[]; }&gt;</code>

**Since:** 0.10.0

---

### deleteEventsById(...)

```typescript
deleteEventsById(options: { ids: string[]; }) => Promise<{ result: { deleted: string[]; failed: string[]; }; }>
```

Deletes events from the calendar given their IDs.
If the event is recurring it will automatically delete this and future events.
To modify this behaviour consider using the method "deleteEventById".

| Param         | Type                            | Description                     |
| ------------- | ------------------------------- | ------------------------------- |
| **`options`** | <code>{ ids: string[]; }</code> | Options for defining event IDs. |

**Returns:** <code>Promise&lt;{ result: { deleted: string[]; failed: string[]; }; }&gt;</code>

**Since:** 0.11.0

---

### deleteEventById(...)

```typescript
deleteEventById(options: { id: string; span?: EventSpan; }) => Promise<{ result: string; }>
```

Deletes an even from the calendar by their ID.

| Param         | Type                                                                    | Description                             |
| ------------- | ----------------------------------------------------------------------- | --------------------------------------- |
| **`options`** | <code>{ id: string; span?: <a href="#eventspan">EventSpan</a>; }</code> | Options for defining event ID and span. |

**Returns:** <code>Promise&lt;{ result: string; }&gt;</code>

**Since:** TODO: Add version number

---

### createCalendar(...)

```typescript
createCalendar(options: { title: string; color?: string; sourceId?: string; }) => Promise<{ result: string; }>
```

Creates a calendar

| Param         | Type                                                               | Description                      |
| ------------- | ------------------------------------------------------------------ | -------------------------------- |
| **`options`** | <code>{ title: string; color?: string; sourceId?: string; }</code> | Options for creating a calendar. |

**Returns:** <code>Promise&lt;{ result: string; }&gt;</code>

**Since:** 5.2.0

---

### deleteCalendar(...)

```typescript
deleteCalendar(options: { id: string; }) => Promise<void>
```

Deletes a calendar by id

| Param         | Type                         | Description                      |
| ------------- | ---------------------------- | -------------------------------- |
| **`options`** | <code>{ id: string; }</code> | Options for deleting a calendar. |

**Since:** 5.2.0

---

### getRemindersFromLists(...)

```typescript
getRemindersFromLists(options?: { listIds: string[]; } | undefined) => Promise<{ result: Reminder[]; }>
```

Retrieves the list of reminders present in the given date range.

| Param         | Type                                | Description                                                                                                           |
| ------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ listIds: string[]; }</code> | Options for defining the date range. It Will fetch all reminders from all available lists if not provided. (Optional) |

**Returns:** <code>Promise&lt;{ result: Reminder[]; }&gt;</code>

**Since:** 5.3.0

---

### deleteRemindersById(...)

```typescript
deleteRemindersById(options: { ids: string[]; }) => Promise<{ result: { deleted: string[]; failed: string[]; }; }>
```

Deletes reminders given their IDs.

| Param         | Type                            | Description                        |
| ------------- | ------------------------------- | ---------------------------------- |
| **`options`** | <code>{ ids: string[]; }</code> | Options for defining reminder IDs. |

**Returns:** <code>Promise&lt;{ result: { deleted: string[]; failed: string[]; }; }&gt;</code>

**Since:** 5.3.0

---

### requestWriteOnlyCalendarAccess()

```typescript
requestWriteOnlyCalendarAccess() => Promise<{ result: PermissionState; }>
```

Requests write access for the calendar. If its already granted, it will directly return the state.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

---

### requestReadOnlyCalendarAccess()

```typescript
requestReadOnlyCalendarAccess() => Promise<{ result: PermissionState; }>
```

Requests read access for the calendar. If its already granted, it will directly return the state.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

---

### requestFullCalendarAccess()

```typescript
requestFullCalendarAccess() => Promise<{ result: PermissionState; }>
```

Requests read and write access for the calendar. If its already granted, it will directly return the state.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

---

### requestFullRemindersAccess()

```typescript
requestFullRemindersAccess() => Promise<{ result: PermissionState; }>
```

Requests read and write access for the reminders. If its already granted, it will directly return the state.

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

**Since:** 5.4.0

---

### modifyEventWithPrompt(...)

```typescript
modifyEventWithPrompt(options: { id: string; update?: { title?: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number | number[]; url?: string; notes?: string; recurrence?: ReminderRecurrenceRule; }; }) => Promise<{ result: string[]; }>
```

Opens a native prompt to modify an event given its id.

| Param         | Type                                                                                                                                                                                                                                                                                                             | Description                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **`options`** | <code>{ id: string; update?: { title?: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number \| number[]; url?: string; notes?: string; recurrence?: <a href="#reminderrecurrencerule">ReminderRecurrenceRule</a>; }; }</code> | The options for modifying an event. |

**Returns:** <code>Promise&lt;{ result: string[]; }&gt;</code>

**Since:** 6.6.0

---

### modifyEvent(...)

```typescript
modifyEvent(options: { id: string; span?: EventSpan; update: { title?: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number | number[]; url?: string; notes?: string; recurrence?: ReminderRecurrenceRule; }; }) => Promise<void>
```

Modifies an event given its id and update details.

| Param         | Type                                                                                                                                                                                                                                                                                                                                                       | Description                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **`options`** | <code>{ id: string; span?: <a href="#eventspan">EventSpan</a>; update: { title?: string; calendarId?: string; location?: string; startDate?: number; endDate?: number; isAllDay?: boolean; alertOffsetInMinutes?: number \| number[]; url?: string; notes?: string; recurrence?: <a href="#reminderrecurrencerule">ReminderRecurrenceRule</a>; }; }</code> | The options for updating an event. |

**Since:** 6.6.0

---

### fetchAllCalendarSources()

```typescript
fetchAllCalendarSources() => Promise<{ result: CalendarSource[]; }>
```

Retrieves a list of calendar sources.

**Returns:** <code>Promise&lt;{ result: CalendarSource[]; }&gt;</code>

**Since:** 6.6.0

---

### fetchAllRemindersSources()

```typescript
fetchAllRemindersSources() => Promise<{ result: CalendarSource[]; }>
```

Retrieves a list of reminders sources.

**Returns:** <code>Promise&lt;{ result: CalendarSource[]; }&gt;</code>

**Since:** 6.6.0

---

### modifyReminder(...)

```typescript
modifyReminder(options: { id: string; update: { title?: string; listId?: string; priority?: number; isCompleted?: boolean; startDate?: number; dueDate?: number; completionDate?: number; notes?: string; url?: string; location?: string; recurrence?: ReminderRecurrenceRule; }; }) => Promise<void>
```

Modifies a reminder given its id and update details.

| Param         | Type                                                                                                                                                                                                                                                                                                            | Description                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **`options`** | <code>{ id: string; update: { title?: string; listId?: string; priority?: number; isCompleted?: boolean; startDate?: number; dueDate?: number; completionDate?: number; notes?: string; url?: string; location?: string; recurrence?: <a href="#reminderrecurrencerule">ReminderRecurrenceRule</a>; }; }</code> | The options for updating a reminder. |

**Since:** 6.7.0

---

### Interfaces

#### PluginPermissionsMap

#### ReminderRecurrenceRule

| Prop            | Type                                                                                | Description                                                                                             |
| --------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **`frequency`** | <code><a href="#reminderrecurrencefrequency">ReminderRecurrenceFrequency</a></code> | How frequent should the reminder repeat.                                                                |
| **`interval`**  | <code>number</code>                                                                 | The interval should be a number greater than 0. For values lower than 1 the method will throw an error. |
| **`end`**       | <code>number</code>                                                                 | When provided, the reminder will stop repeating at the given time.                                      |

#### Calendar

Represents a calendar object.

| Prop                             | Type                                                      |
| -------------------------------- | --------------------------------------------------------- |
| **`id`**                         | <code>string</code>                                       |
| **`title`**                      | <code>string</code>                                       |
| **`color`**                      | <code>string</code>                                       |
| **`isImmutable`**                | <code>boolean</code>                                      |
| **`allowsContentModifications`** | <code>boolean</code>                                      |
| **`type`**                       | <code><a href="#calendartype">CalendarType</a></code>     |
| **`isSubscribed`**               | <code>boolean</code>                                      |
| **`source`**                     | <code><a href="#calendarsource">CalendarSource</a></code> |

#### CalendarSource

Represents the account a calendar belongs to

| Prop        | Type                                                              |
| ----------- | ----------------------------------------------------------------- |
| **`type`**  | <code><a href="#calendarsourcetype">CalendarSourceType</a></code> |
| **`id`**    | <code>string</code>                                               |
| **`title`** | <code>string</code>                                               |

#### RemindersList

#### CalendarEvent

Represents an event in the calendar.

| Prop                   | Type                                                   |
| ---------------------- | ------------------------------------------------------ |
| **`id`**               | <code>string</code>                                    |
| **`title`**            | <code>string</code>                                    |
| **`location`**         | <code>string</code>                                    |
| **`eventColor`**       | <code>string</code>                                    |
| **`organizer`**        | <code>string</code>                                    |
| **`description`**      | <code>string</code>                                    |
| **`startDate`**        | <code>number</code>                                    |
| **`endDate`**          | <code>number</code>                                    |
| **`eventTimezone`**    | <code>{ region: string; abbreviation: string; }</code> |
| **`eventEndTimezone`** | <code>{ region: string; abbreviation: string; }</code> |
| **`duration`**         | <code>string</code>                                    |
| **`isAllDay`**         | <code>boolean</code>                                   |
| **`calendarId`**       | <code>string</code>                                    |
| **`url`**              | <code>string</code>                                    |

#### Reminder

Represents a reminder in a reminders list.

| Prop                 | Type                                  |
| -------------------- | ------------------------------------- |
| **`id`**             | <code>string</code>                   |
| **`title`**          | <code>string</code>                   |
| **`listId`**         | <code>string</code>                   |
| **`isCompleted`**    | <code>boolean</code>                  |
| **`priority`**       | <code>number</code>                   |
| **`notes`**          | <code>string</code>                   |
| **`location`**       | <code>string</code>                   |
| **`url`**            | <code>string</code>                   |
| **`startDate`**      | <code>number</code>                   |
| **`dueDate`**        | <code>number</code>                   |
| **`completionDate`** | <code>number</code>                   |
| **`recurrence`**     | <code>ReminderRecurrenceRule[]</code> |

### Type Aliases

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

### Enums

#### PluginPermission

| Members               | Value                         | Description                                            |
| --------------------- | ----------------------------- | ------------------------------------------------------ |
| **`READ_CALENDAR`**   | <code>'readCalendar'</code>   | Represents the permission state for reading calendar.  |
| **`WRITE_CALENDAR`**  | <code>'writeCalendar'</code>  | Represents the permission state for writing calendar.  |
| **`READ_REMINDERS`**  | <code>'readReminders'</code>  | Represents the permission state for reading reminders. |
| **`WRITE_REMINDERS`** | <code>'writeReminders'</code> | Represents the permission state for writing reminders. |

#### ReminderRecurrenceFrequency

| Members       | Description                             |
| ------------- | --------------------------------------- |
| **`DAILY`**   | The reminder repeats on a daily basis   |
| **`WEEKLY`**  | The reminder repeats on a weekly basis  |
| **`MONTHLY`** | The reminder repeats on a monthly basis |
| **`YEARLY`**  | The reminder repeats on a yearly basis  |

#### CalendarType

| Members            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| **`LOCAL`**        | This calendar is sync'd from either Mobile Me or tethered. |
| **`CAL_DAV`**      | This calendar is from a CalDAV server.                     |
| **`EXCHANGE`**     | This calendar comes from an Exchange server.               |
| **`SUBSCRIPTION`** | This is a locally subscribed calendar.                     |
| **`BIRTHDAY`**     | This is the built-in birthday calendar.                    |

#### CalendarSourceType

| Members          | Description                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`LOCAL`**      | Calendars that are stored locally on the device. These calendars are not synced with any external service.                                                                                 |
| **`EXCHANGE`**   | Calendars that are associated with an Exchange server. Exchange is a popular calendar and email service used by many enterprises.                                                          |
| **`CAL_DAV`**    | Calendars that use the CalDAV protocol for synchronization. This includes calendars from services like Google <a href="#calendar">Calendar</a> and Yahoo <a href="#calendar">Calendar</a>. |
| **`MOBILE_ME`**  | Calendars that were previously associated with MobileMe, Apple's cloud service before iCloud. This source type is largely obsolete now.                                                    |
| **`SUBSCRIBED`** | Calendars that the user has subscribed to. These are read-only calendars that can be added by subscribing to a calendar URL.                                                               |
| **`BIRTHDAYS`**  | The built-in Birthdays calendar, which shows birthdays of contacts from the user's address book. This calendar is typically read-only and is managed by the system.                        |

#### CalendarChooserDisplayStyle

| Members                       | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| **`ALL_CALENDARS`**           | Display all calendars available for selection.           |
| **`WRITABLE_CALENDARS_ONLY`** | Display only writable calendars available for selection. |

#### CalendarChooserSelectionStyle

| Members        | Description                                             |
| -------------- | ------------------------------------------------------- |
| **`SINGLE`**   | Allows only a single selection in the calendar chooser. |
| **`MULTIPLE`** | Allows multiple selections in the calendar chooser.     |

#### EventSpan

| Members                      | Description                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| **`THIS_EVENT`**             | The modifications should only be applied to this event.                                       |
| **`THIS_AND_FUTURE_EVENTS`** | The modifications to this event should also be applied to the future instances of this event. |

</docgen-api>
