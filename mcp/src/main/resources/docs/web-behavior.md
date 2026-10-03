# Web behavior

`@ebarooni/capacitor-calendar` on the web is **export-only**. It does not write to a device calendar or an app-local store.

## What works

| Surface | Behavior |
| :------ | :------- |
| `createEvent(...)` | Builds one RFC 5545 `VCALENDAR` / `VEVENT` as a `File` (`CreateEventResult.ics`). `id` is always `null`. Does not start a download. |
| `downloadIcsFile(...)` | Package helper. Triggers a browser download for that `File`. |
| Calendar permission check / request | Resolve to `"granted"`. There is **no OS calendar permission**. Unblocks shared code before `createEvent` / ICS export. |
| Reminder permission check / request | Resolve to `"granted"` for isomorphic app code only. There is **no OS reminders permission**, and **no reminder APIs** on web yet. |

## Permissions

### Calendar

Call `requestFullCalendarAccess()` (or calendar scopes on `checkPermission` / `requestPermission`) the same way as on native. On web they succeed with `"granted"` so shared app code can reach `createEvent` without a platform branch.

`"granted"` does **not** mean the plugin can write to a browser calendar. For calendar methods it only means “safe to continue with ICS export via `createEvent`.”

### Reminders

`requestFullRemindersAccess()` and reminder scopes (`readReminders`, `writeReminders`) also resolve `"granted"` on web. That grant is a no-op for isomorphic code paths. It does **not** enable `createReminder`, reminder lists, or any other reminder API. Those stay `unimplemented` on web (reminder ICS / `VTODO` is not shipped yet).

Do not treat a reminder permission grant as product support for reminders on web.

## Ignored `CreateEventOptions` on web

These fields have no effect on web:

- `calendarId`
- `color`
- `commit`
- `duration` — use `endDate` instead

## Times in the ICS file

- **Timed events:** `DTSTART` / `DTEND` are UTC (`…Z`).
- **All-day events:** local calendar dates with `VALUE=DATE`.
- There is no `TZID` / `VTIMEZONE` yet.

## What stays unimplemented

List/modify/delete events, calendar CRUD, sources, chooser, native prompts, `openCalendar`, and **all reminder APIs** still reject with Capacitor `unimplemented` on web.
