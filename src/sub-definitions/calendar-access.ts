import { CalendarPermissionScope } from "../schemas/enums/calendar-permission-scope";
import { PermissionState } from "@capacitor/core";

/**
 * @since 7.1.0
 */
export interface CalendarAccess {
  /**
   * Retrieves the current permission state for a given scope.
   *
   * @example
   * CapacitorCalendar.checkPermission({ scope: CalendarPermissionScope.READ_CALENDAR });
   *
   * @platform Android, iOS
   * @since 0.1.0
   *
   */
  checkPermission(options: {
    scope: CalendarPermissionScope;
  }): Promise<{ result: PermissionState }>;

  /**
   * Retrieves the current state of all permissions.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  checkAllPermissions(): Promise<{ result: CheckAllPermissionsResult }>;

  /**
   * Requests permission for a given scope.
   *
   * @example
   * this.requestPermission({ scope: CalendarPermissionScope.READ_CALENDAR });
   *
   * @deprecated Use {@link requestWriteOnlyCalendarAccess}, {@link requestReadOnlyCalendarAccess},
   * {@link requestFullCalendarAccess} or {@link requestFullRemindersAccess} instead.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  requestPermission(options: {
    scope: CalendarPermissionScope;
  }): Promise<{ result: PermissionState }>;

  /**
   * Requests permission for all calendar and reminder permissions.
   *
   * @deprecated Use {@link requestFullCalendarAccess} or {@link requestFullRemindersAccess} instead.
   * @platform Android, iOS
   * @since 0.1.0
   */
  requestAllPermissions(): Promise<{ result: RequestAllPermissionsResult }>;

  /**
   * Requests write access to the calendar.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsWriteOnlyAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.WRITE_CALENDAR` |
   *
   * @platform Android, iOS
   * @since 5.4.0
   */
  requestWriteOnlyCalendarAccess(): Promise<{ result: PermissionState }>;

  /**
   * Requests read access to the calendar.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | Android   | `android.permission.READ_CALENDAR` |
   *
   * @platform Android
   * @since 5.4.0
   */
  requestReadOnlyCalendarAccess(): Promise<{ result: PermissionState }>;

  /**
   * Requests read and write access to the calendar.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSCalendarsFullAccessUsageDescription` |
   * | iOS 13-16 | `NSCalendarsUsageDescription` |
   * | Android   | `android.permission.READ_CALENDAR` & `android.permission.WRITE_CALENDAR` |
   *
   * @platform Android, iOS
   * @since 5.4.0
   */
  requestFullCalendarAccess(): Promise<{ result: PermissionState }>;
}

/**
 * @platform Android, iOS
 * @since 7.1.0
 */
export type CheckAllPermissionsResult = Record<
  CalendarPermissionScope,
  PermissionState
>;

/**
 * @platform Android, iOS
 * @since 7.1.0
 */
export type RequestAllPermissionsResult = CheckAllPermissionsResult;
