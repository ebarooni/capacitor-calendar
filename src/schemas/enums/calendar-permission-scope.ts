/**
 * Enum defining available calendar and reminders related permissions.
 *
 * @since 7.1.0
 */
export enum CalendarPermissionScope {
  /**
   * Permission required for reading calendar events.
   *
   * @since 7.1.0
   * @platform Android, iOS
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsFullAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.READ_CALENDAR` |
   */
  READ_CALENDAR = "readCalendar",

  /**
   * Permission required for reading reminders.
   *
   * @since 7.1.0
   * @platform iOS
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSRemindersFullAccessUsageDescription` |
   * | iOS 10-16 | `NSRemindersUsageDescription` |
   */
  READ_REMINDERS = "readReminders",

  /**
   * Permission required for adding or modifying calendar events.
   *
   * @since 7.1.0
   * @platform Android, iOS
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsWriteOnlyAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.WRITE_CALENDAR` |
   */
  WRITE_CALENDAR = "writeCalendar",

  /**
   * Permission required for adding or modifying reminders.
   *
   * @since 7.1.0
   * @platform iOS
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSRemindersFullAccessUsageDescription` |
   * | iOS 13-16 | `NSRemindersUsageDescription` |
   */
  WRITE_REMINDERS = "writeReminders",
}
