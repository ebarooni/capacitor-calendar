# Web behavior

`@ebarooni/capacitor-calendar` on the web is **export-only**. It does not write to a device calendar or an app-local store.

## What works

| Surface                | Behavior                                                                                                                            |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `createEvent(...)`     | Builds one RFC 5545 `VCALENDAR` / `VEVENT` as a `File` (`CreateEventResult.ics`). `id` is always `null`. Does not start a download. |
| `downloadIcsFile(...)` | Package helper. Triggers a browser download for that `File`.                                                                        |

## Permissions

There is **no permission model on web**. Permission check and request methods reject with Capacitor `unimplemented`. Call `createEvent` / `downloadIcsFile` directly (or branch by platform in shared code).

## Ignored `CreateEventOptions`

These fields have no effect: `calendarId`, `color`, `commit`.

## `endDate` and `duration`

- If `endDate` is set, it is used for `DTEND`.
- Else if `duration` is set (RFC2445, same as Android — for example `PT1H`, `P1D`), the end is `startDate` + that duration.
- If both are set, **`endDate` wins**.
- If neither is set, timed events default to one hour; all-day events default to the next local day.
- All-day: if the resolved end is still the same local day as the start (for example `PT1H`), the end bumps to the next local day so exclusive `DTEND` is one day long. Multi-day durations such as `P3D` keep that later exclusive end.

## Times in the ICS file

- **Timed events:** `DTSTART` / `DTEND` are UTC (`…Z`).
- **All-day events:** local calendar dates with `VALUE=DATE`.
- No `TZID` / `VTIMEZONE` yet.

## What stays unimplemented

Permission APIs, list/modify/delete events, calendar CRUD, sources, chooser, native prompts, `openCalendar`, and all reminder APIs reject with Capacitor `unimplemented`.
