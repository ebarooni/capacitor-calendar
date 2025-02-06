/**
 * Enum defining available calendar and reminders related permissions.
 *
 * @since 7.1.0
 */
export enum CalendarPermissionScope {
  /**
   * Permission required for reading calendar events.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsFullAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.READ_CALENDAR` |
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  READ_CALENDAR = "readCalendar",

  /**
   * Permission required for reading reminders.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSRemindersFullAccessUsageDescription` |
   * | iOS 10-16 | `NSRemindersUsageDescription` |
   * @platform iOS
   * @since 7.1.0
   */
  READ_REMINDERS = "readReminders",

  /**
   * Permission required for adding or modifying calendar events.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsWriteOnlyAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.WRITE_CALENDAR` |
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  WRITE_CALENDAR = "writeCalendar",

  /**
   * Permission required for adding or modifying reminders.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSRemindersFullAccessUsageDescription` |
   * | iOS 13-16 | `NSRemindersUsageDescription` |
   *
   * @platform iOS
   * @since 7.1.0
   */
  WRITE_REMINDERS = "writeReminders",
}
