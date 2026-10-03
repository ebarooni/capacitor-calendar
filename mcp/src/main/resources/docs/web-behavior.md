# Web behavior

`@ebarooni/capacitor-calendar` on the web is **export-only**. It does not write to a device calendar or an app-local store.

## What works

| Surface                | Behavior                                                                                                                            |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `createEvent(...)`     | Builds one RFC 5545 `VCALENDAR` / `VEVENT` as a `File` (`CreateEventResult.ics`). `id` is always `null`. Does not start a download. |
| `downloadIcsFile(...)` | Package helper. Triggers a browser download for that `File`.                                                                        |

## Permissions

There is **no permission model on web**. All permission check and request methods (`checkPermission`, `checkAllPermissions`, `requestPermission`, `requestAllPermissions`, `requestFullCalendarAccess`, `requestWriteOnlyCalendarAccess`, `requestReadOnlyCalendarAccess`, `requestFullRemindersAccess`) reject with Capacitor `unimplemented`.

Call `createEvent` / `downloadIcsFile` directly. If your app shares one code path with native, branch on platform and skip permission APIs on web.

## Ignored `CreateEventOptions` on web

These fields have no effect on web:

- `calendarId`
- `color`
- `commit`

## `endDate` and `duration`

- If `endDate` is set, it is used for `DTEND` (all-day exclusive-end rules unchanged).
- Else if `duration` is set (RFC2445 / iCalendar duration string, same as Android — for example `PT1H`, `P1D`, `P2DT4H30M`), the end is `startDate` + that duration.
- If both are set, **`endDate` wins**; `duration` is not applied.
- If neither is set, timed events default to one hour; all-day events default to the next local day.

## Times in the ICS file

- **Timed events:** `DTSTART` / `DTEND` are UTC (`…Z`).
- **All-day events:** local calendar dates with `VALUE=DATE`.
- There is no `TZID` / `VTIMEZONE` yet.

## What stays unimplemented

Permission APIs, list/modify/delete events, calendar CRUD, sources, chooser, native prompts, `openCalendar`, and all reminder APIs reject with Capacitor `unimplemented` on web.
