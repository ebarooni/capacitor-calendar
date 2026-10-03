import type { CalendarPermissionScope } from '../enums/calendar-permission-scope';

/**
 * Options for {@link CalendarAccess#checkPermission}.
 *
 * @since 8.3.1
 */
export interface CheckPermissionOptions {
  /**
   * The permission scope to check.
   *
   * On Android, `readReminders` and `writeReminders` resolve to `"prompt"`
   * (reminders are not supported on Android).
   * On Web, every valid scope resolves to `"granted"`.
   * Reminder scopes on Web do not enable reminder APIs.
   *
   * @example CalendarPermissionScope.READ_CALENDAR
   * @platform Android, iOS, Web
   * @since 8.3.1
   */
  scope: CalendarPermissionScope;
}
