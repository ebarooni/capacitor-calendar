export enum PluginPermission {
  /**
   * Represents the permission state for reading calendar.
   * @platform iOS, Android
   */
  READ_CALENDAR = 'readCalendar',

  /**
   * Represents the permission state for writing calendar.
   * @platform iOS, Android
   */
  WRITE_CALENDAR = 'writeCalendar',

  /**
   * Represents the permission state for reading reminders.
   * @platform iOS
   */
  READ_REMINDERS = 'readReminders',

  /**
   * Represents the permission state for writing reminders.
   * @platform iOS
   */
  WRITE_REMINDERS = 'writeReminders',
}
