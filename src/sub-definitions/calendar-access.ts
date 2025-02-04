import { CalendarPermissionScope } from "../schemas/enums/calendar-permission-scope";
import { PermissionState } from "@capacitor/core";

/**
 * @since 7.1.0
 */
export interface CalendarAccess {
  /**
   * Retrieves the current permission state for a given permission scope.
   *
   * @since 0.1.0
   * @platform Android, iOS
   *
   * @example
   * CapacitorCalendar.checkPermission({ scope: CalendarPermissionScope.READ_CALENDAR });
   */
  checkPermission(options: {
    scope: CalendarPermissionScope;
  }): Promise<{ result: PermissionState }>;

  /**
   * Retrieves the current state of all permissions.
   *
   * @since 0.1.0
   * @platform Android, iOS
   */
  checkAllPermissions(): Promise<{ result: CheckAllPermissionsResult }>;

  /**
   * Requests permission for a given permission scope.
   *
   * @since 0.1.0
   * @platform Android, iOS
   *
   * @example
   * this.requestPermission({ scope: CalendarPermissionScope.READ_CALENDAR });
   */
  requestPermission(options: {
    scope: CalendarPermissionScope;
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
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsWriteOnlyAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.WRITE_CALENDAR` |
   */
  requestWriteOnlyCalendarAccess(): Promise<{ result: PermissionState }>;

  /**
   * Requests read access to the calendar.
   *
   * @since 5.4.0
   * @platform Android
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | Android   | `android.permission.READ_CALENDAR` |
   */
  requestReadOnlyCalendarAccess(): Promise<{ result: PermissionState }>;

  /**
   * Requests read and write access to the calendar.
   *
   * @since 5.4.0
   * @platform Android, iOS
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsFullAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.READ_CALENDAR` & `android.permission.WRITE_CALENDAR` |
   */
  requestFullCalendarAccess(): Promise<{ result: PermissionState }>;
}

/**
 * @since 7.1.0
 * @platform Android, iOS
 */
export type CheckAllPermissionsResult = Record<
  CalendarPermissionScope,
  PermissionState
>;

/**
 * @since 7.1.0
 * @platform Android, iOS
 */
export type RequestAllPermissionsResult = CheckAllPermissionsResult;
