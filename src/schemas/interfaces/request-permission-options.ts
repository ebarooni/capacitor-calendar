import type { CalendarPermissionScope } from '../enums/calendar-permission-scope';

/**
 * Options for {@link CalendarAccess#requestPermission}.
 *
 * @since 8.3.1
 */
export interface RequestPermissionOptions {
  /**
   * The permission scope to request.
   * On Web, every valid scope resolves to `"granted"`.
   *
   * @example CalendarPermissionScope.READ_CALENDAR
   * @platform Android, iOS, Web
   * @since 8.3.1
   */
  scope: CalendarPermissionScope;
}
