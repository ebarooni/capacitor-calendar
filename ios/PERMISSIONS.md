# Permissions

Depending on what iOS version is your app linked on, you must include in your `Info.plist` the usage description keys
for the types of data that you need to access.

Only include the keys that your app needs and keep in mind that you might need to include multiple keys depending on the
range of iOS version that you app is linked on.

### iOS 17 &le;

| Permission Key                               | Purpose                                        |
| :------------------------------------------- | :--------------------------------------------- |
| `NSCalendarsWriteOnlyAccessUsageDescription` | Enables write access to the calendar           |
| `NSCalendarsFullAccessUsageDescription`      | Enables read and write access to the calendar  |
| `NSRemindersFullAccessUsageDescription`      | Enables read and write access to the reminders |

### 13 &le; iOS &le; 16

| Permission Key                | Purpose                                                                                             |
| :---------------------------- | :-------------------------------------------------------------------------------------------------- |
| `NSCalendarsUsageDescription` | Enables read and write access to the calendar                                                       |
| `NSRemindersUsageDescription` | Enables read and write access to the reminders                                                      |
| `NSContactsUsageDescription`  | Known (so far) to be needed for being able to enter the location when using `createEventWithPrompt` |

### macOS

To access calendar data, all sandboxed macOS apps must include the `com.apple.security.personal-information.calendars entitlement`.
