# Error codes

On Android and iOS, a rejected call can expose `error.code` (stable category) and `error.message` (exact cause). Compare codes with the exported `CapacitorCalendarErrorCode` enum. Not every reject has a code yet.

| Code           | Name                 | When                                                                              |
| :------------- | :------------------- | :-------------------------------------------------------------------------------- |
| `EB-CLDR-0001` | `InvalidArgument`    | A required argument is missing or invalid.                                        |
| `EB-CLDR-0002` | `NotFound`           | The requested calendar, event, list, reminder, or calendar source does not exist. |
| `EB-CLDR-0004` | `IoError`            | A calendar store read or write failed.                                            |
| `EB-CLDR-0005` | `NotSupported`       | The device cannot open the calendar UI, reminders UI, or target URL.              |
| `EB-CLDR-0020` | `PermissionDenied`   | Calendar access was denied.                                                       |
| `EB-CLDR-0100` | `MissingDeclaration` | Required Info.plist usage description or AndroidManifest permission is not set.   |

## Example

```typescript
import { CapacitorCalendar, CapacitorCalendarErrorCode } from '@ebarooni/capacitor-calendar';

try {
  await CapacitorCalendar.listEventsInRange({ from, to });
} catch (error) {
  if (error.code === CapacitorCalendarErrorCode.PermissionDenied) {
    // Ask the user to grant calendar access in the system settings.
  }
}
```

## `PermissionDenied` (`EB-CLDR-0020`)

- Calendar operations that fail with a permission error reject with this code on Android and iOS.
- On iOS, this applies when EventKit reports `eventStoreNotAuthorized`.
- Permission check and request APIs do not reject with this code. They resolve `"denied"`.

## `MissingDeclaration` (`EB-CLDR-0100`)

- A method that needs Info.plist usage keys or manifest permissions checks them at its start.
- The message names the missing key. Add it as shown in `docs://permissions/ios` or `docs://permissions/android`.
- `checkPermission` and `checkAllPermissions` do not check declarations.

## `InvalidArgument` and `NotFound` for ids

Android rejects a non-numeric or empty calendar or event `id` as `InvalidArgument`. iOS looks up the string in the system calendar store and may reject as `NotFound` when nothing matches.

## `IoError`

- Android and iOS use this code for store failures, such as failed create or delete.
- On iOS, EventKit store or system rejects use this code, except an authorization denial (`PermissionDenied`).
- On iOS, an unhandled permission status and the edit-prompt `processFailed` outcome also use this code.

## Messages

For system store, launch, and permission failures, the message starts with a fixed sentence. If the OS gives a different detail, the message appends it in parentheses.

## Web

Web rejects unsupported methods with Capacitor `unimplemented`. It does not use these codes. See `docs://web-behavior`.
