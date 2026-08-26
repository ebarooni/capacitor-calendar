import type { CalendarPermissionScope } from '../enums/calendar-permission-scope';

/**
 * Options for {@link CalendarAccess#requestPermission}.
 *
 * @since 8.3.1
 */
export interface RequestPermissionOptions {
  /**
   * The permission scope to request.
   *
   * @example CalendarPermissionScope.READ_CALENDAR
   * @platform Android, iOS
   * @since 8.3.1
   */
  scope: CalendarPermissionScope;
}
