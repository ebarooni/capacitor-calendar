# Web behavior

`@ebarooni/capacitor-calendar` on the web is **export-only**. It does not write to a device calendar or an app-local store.

## What works

| Surface | Behavior |
| :------ | :------- |
| `createEvent(...)` | Builds one RFC 5545 `VCALENDAR` / `VEVENT` as a `File` (`CreateEventResult.ics`). `id` is always `null`. Does not start a download. |
| `downloadIcsFile(...)` | Package helper. Triggers a browser download for that `File`. |
| Permission check / request methods | Resolve to `"granted"`. There is **no OS calendar permission**. |

## Permissions

Call `requestFullCalendarAccess()` (or the other check/request methods) the same way as on native. On web they succeed with `"granted"` so shared app code can reach `createEvent` without a platform branch.

`"granted"` does **not** mean the plugin can write to a browser calendar. It only means “safe to continue with ICS export.”

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

List/modify/delete events, calendar CRUD, sources, chooser, native prompts, `openCalendar`, and reminder CRUD still reject with Capacitor `unimplemented` on web.
