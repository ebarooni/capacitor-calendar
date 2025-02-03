import { PermissionState } from "@capacitor/core";
import { PluginPermission } from "../schemas/enums/plugin-permission";

export interface CalendarAccess {
  /**
   * Retrieves the current permission status for a given permission alias.
   *
   * @since 0.1.0
   * @platform Android, iOS
   *
   * @example
   * CapacitorCalendar.checkPermission({ alias: 'readCalendar' });
   */
  checkPermission(options: {
    alias: PluginPermission;
  }): Promise<{ result: PermissionState }>;

  /**
   * Retrieves the current status of all permissions.
   *
   * @since 0.1.0
   * @platform Android, iOS
   */
  checkAllPermissions(): Promise<{ result: CheckAllPermissionsResult }>;

  /**
   * Requests permission for a given permission alias.
   *
   * @since 0.1.0
   * @platform Android, iOS
   *
   * @example
   * this.requestPermission({ alias: 'readCalendar' });
   */
  requestPermission(options: {
    alias: PluginPermission;
  }): Promise<{ result: PermissionState }>;

  /**
   * Requests permission for all permissions.
   *
   * @since 0.1.0
   * @platform Android, iOS
   */
  requestAllPermissions(): Promise<{ result: RequestAllPermissionsResult }>;

  /**
   * Requests write access to the calendar.
   *
   * @since 5.4.0
   * @platform Android, iOS
   */
  requestWriteOnlyCalendarAccess(): Promise<{ result: PermissionState }>;

  /**
   * Requests read access to the calendar.
   *
   * @since 5.4.0
   * @platform Android
   */
  requestReadOnlyCalendarAccess(): Promise<{ result: PermissionState }>;

  /**
   * Requests read and write access to the calendar.
   *
   * @since 5.4.0
   * @platform Android, iOS
   */
  requestFullCalendarAccess(): Promise<{ result: PermissionState }>;

  /**
   * Requests read and write access to the reminders.
   *
   * @since 5.4.0
   * @platform iOS
   */
  requestFullRemindersAccess(): Promise<{ result: PermissionState }>;
}

/**
 * @since 7.1.0
 * @platform Android, iOS
 */
export type CheckAllPermissionsResult = Record<
  PluginPermission,
  PermissionState
>;

/**
 * @since 7.1.0
 * @platform Android, iOS
 */
export type RequestAllPermissionsResult = CheckAllPermissionsResult;
