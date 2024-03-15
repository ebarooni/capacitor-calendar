# Permissions

Depending on what iOS version is your app linked on, you must include in your `Info.plist` the usage description keys 
for the types of data that you need to access.

Only include the keys that your app needs and keep in mind that you might need to include multiple keys depending on the
range of iOS version that you app is linked on.

### &ge; iOS 17

* `NSCalendarsWriteOnlyAccessUsageDescription` if your app needs only write access to the calendar but does not have to
read any events (including the events that your app creates).
* `NSCalendarsFullAccessUsageDescription` if you app needs read and write access for the calendar events.
* `NSRemindersFullAccessUsageDescription` if your app needs access to reminders.

If you only request for write access, your app will not be able to read from the calendar. However, read access mean your
app has full access (read and write) to the calendar.

### iOS 10 until iOS 16

* `NSCalendarsUsageDescription` if your app needs read and write access for calendar events.
* `NSRemindersUsageDescription` if your app needs access to reminders.

### macOS

To access Calendar data, all sandboxed macOS apps must include the `com.apple.security.personal-information.calendars entitlement`.