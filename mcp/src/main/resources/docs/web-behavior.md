# Web behavior

`@ebarooni/capacitor-calendar` on the web is **export-only**. It does not write to a device calendar or an app-local store.

## What works

| Surface                        | Behavior                                                                                                                                                                                       |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createEvent(...)`             | Builds one RFC 5545 `VCALENDAR` / `VEVENT` as a `File` (`CreateEventResult.ics`). `id` is always `null`. Set `autoDownloadIcsFile: true` to also trigger a download (default **false**).       |
| `createEventWithPrompt(...)`   | Confirm dialog (title + time, or `promptMessage`). On OK, builds ICS like `createEvent`. On cancel, resolves `{ id: null, ics: null }` (no reject). `autoDownloadIcsFile` default **true**.    |
| `downloadIcsFile(...)`         | Package helper. Triggers a browser download for that `File`.                                                                                                                                   |
| `shareIcsFile(file, opts?)`    | Package helper. Opens the share sheet (`navigator.share`). Falls back to a download when the browser cannot share files. Resolves `'shared'`, `'cancelled'`, or `'downloaded'`. Needs a click. |
| `createIcsFile(events, opts?)` | Package helper. One `File` for one event or many. `{ method: 'CANCEL' }` makes a cancel file. Use the same `uid` as the file you made before.                                                  |
| `getCalendarLinks(event)`      | Package helper. Returns `{ google, outlook, office365, yahoo }` links that open a web calendar with the event filled in. The user must confirm there.                                          |
| `openCalendar({ provider })`   | Opens the day view of `google`, `outlook`, or `office365` in a new tab. Without `provider` it rejects with `unimplemented`.                                                                    |

## Updating and cancelling events

Web has no calendar store, so `modifyEvent` and `deleteEvent` stay unimplemented. Set `uid` and a higher `sequence` on `createEvent` to make an updated file for an event the user imported before. Use `createIcsFile(..., { method: 'CANCEL' })` to cancel it. Support for updates differs by calendar app.

## `createEventWithPrompt` and the confirm dialog

The dialog is `window.confirm`. Some browsers block it (for example in some iframes) and it then counts as cancel. Set `skipPrompt: true` to skip the dialog.

## Permissions

There is **no permission model on web**. Permission check and request methods reject with Capacitor `unimplemented`. Call `createEvent` / `createEventWithPrompt` / `downloadIcsFile` directly (or branch by platform in shared code).

## Ignored `CreateEventOptions`

These fields have no effect: `calendarId`, `color`, `commit`.

## Ignored `CreateEventWithPromptOptions`

These fields have no effect: `calendarId`, `invitees`.

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

Permission APIs, list/modify/delete events, calendar CRUD, sources, chooser, other native prompts (`modifyEventWithPrompt`, `deleteEventWithPrompt`), `openCalendar`, and all reminder APIs reject with Capacitor `unimplemented`.
