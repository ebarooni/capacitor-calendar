import type { PermissionState } from '@capacitor/core';

import type { CalendarPermissionScope } from '../schemas/enums/calendar-permission-scope';
import type { CheckPermissionOptions } from '../schemas/interfaces/check-permission-options';
import type { RequestPermissionOptions } from '../schemas/interfaces/request-permission-options';

/**
 * @since 7.1.0
 */
export interface CalendarAccess {
  /**
   * Retrieves the current permission state for a given scope.
   * On Android, `readReminders` and `writeReminders` resolve to `"prompt"`.
   *
   * @example
   * CapacitorCalendar.checkPermission({ scope: CalendarPermissionScope.READ_CALENDAR });
   *
   * @throws {Error} `Scope must be provided.` — when `scope` is missing.
   * @throws {Error} `Invalid scope.` — when `scope` is invalid.
   * @throws {Error} `Unhandled permission state.` — when the native status cannot be mapped.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  checkPermission(options: CheckPermissionOptions): Promise<{ result: PermissionState }>;

  /**
   * Retrieves the current state of all permissions.
   * On Android, reminder keys always resolve to `"prompt"`.
   *
   * @throws {Error} `Unhandled permission state.` — when a native status cannot be mapped.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  checkAllPermissions(): Promise<{ result: CheckAllPermissionsResult }>;

  /**
   * Requests permission for a given scope.
   * On Android, `readReminders` and `writeReminders` reject with `Invalid scope.`
   *
   * @example
   * CapacitorCalendar.requestPermission({ scope: CalendarPermissionScope.READ_CALENDAR });
   *
   * @throws {Error} `Scope must be provided.` — when `scope` is missing.
   * @throws {Error} `Invalid scope.` — when `scope` is invalid, or a reminders scope on Android.
   *
   * @deprecated Use {@link requestWriteOnlyCalendarAccess},
   * {@link requestReadOnlyCalendarAccess} (Android),
   * {@link requestFullCalendarAccess} (also for read on iOS),
   * or {@link requestFullRemindersAccess} instead.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  requestPermission(options: RequestPermissionOptions): Promise<{ result: PermissionState }>;

  /**
   * Requests permission for all calendar and reminder permissions.
   * On Android, only calendar permissions are requested; reminder keys stay `"prompt"`.
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
export type CheckAllPermissionsResult = Record<CalendarPermissionScope, PermissionState>;

/**
 * @platform Android, iOS
 * @since 7.1.0
 */
export type RequestAllPermissionsResult = CheckAllPermissionsResult;
