/**
 * Enum representing the available runtime permissions for the plugin.
 *
 * @enum PluginPermission
 * @platform iOS, Android
 */
export enum PluginPermission {
  /**
   * Represents the permission state for reading calendar.
   *
   * @platform iOS, Android
   * @permissions
   * <h3>Manifest Permissions:</h3>
   * <ul>
   *   <li><strong>iOS 17 &le;:</strong> NSCalendarsFullAccessUsageDescription</li>
   *   <li><strong>iOS 10 &le; x &le; iOS 16:</strong> NSCalendarsUsageDescription</li>
   *   <li><strong>Android:</strong> android.permission.READ_CALENDAR</li>
   * </ul>
   */
  READ_CALENDAR = 'readCalendar',

  /**
   * Represents the permission state for writing calendar.
   *
   * @platform iOS, Android
   * @permissions
   * <h3>Manifest Permissions:</h3>
   * <ul>
   *   <li><strong>iOS 17 &le;:</strong> NSCalendarsWriteOnlyAccessUsageDescription</li>
   *   <li><strong>iOS 10 &le; x &le; iOS 16:</strong> NSCalendarsUsageDescription</li>
   *   <li><strong>Android:</strong> android.permission.WRITE_CALENDAR</li>
   * </ul>
   */
  WRITE_CALENDAR = 'writeCalendar',

  /**
   * Represents the permission state for reading reminders.
   *
   * @platform iOS
   * @permissions
   * <h3>Manifest Permissions:</h3>
   * <ul>
   *   <li><strong>iOS 17 &le;:</strong> NSRemindersFullAccessUsageDescription</li>
   *   <li><strong>iOS 10 &le; x &le; iOS 16:</strong> NSRemindersUsageDescription</li>
   * </ul>
   */
  READ_REMINDERS = 'readReminders',

  /**
   * Represents the permission state for writing reminders.
   *
   * @platform iOS
   * @permissions
   * <h3>Manifest Permissions:</h3>
   * <ul>
   *   <li><strong>iOS 17 &le;:</strong> NSRemindersFullAccessUsageDescription</li>
   *   <li><strong>iOS 10 &le; x &le; iOS 16:</strong> NSRemindersUsageDescription</li>
   * </ul>
   */
  WRITE_REMINDERS = 'writeReminders',
}
