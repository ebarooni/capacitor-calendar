import type { CalendarPermissionScope } from '../enums/calendar-permission-scope';

/**
 * Options for {@link CalendarAccess#requestPermission}.
 *
 * @since 7.3.0
 */
export interface RequestPermissionOptions {
  /**
   * The permission scope to request.
   *
   * @example CalendarPermissionScope.READ_CALENDAR
   * @platform Android, iOS
   * @since 7.3.0
   */
  scope: CalendarPermissionScope;
}
