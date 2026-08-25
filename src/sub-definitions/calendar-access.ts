import type { PermissionState } from '@capacitor/core';

import type { CalendarPermissionScope } from '../schemas/enums/calendar-permission-scope';
import type { CheckPermissionOptions } from '../schemas/interfaces/check-permission-options';

/**
 * @since 7.1.0
 */
export interface CalendarAccess {
  /**
   * Retrieves the current permission state for a given scope.
   *
   * On Android, `readReminders` and `writeReminders` are not supported by the OS.
   * Calling this method with those scopes resolves with `result: "prompt"` (they are
   * never granted on Android).
   *
   * On iOS 17+, EventKit may report write-only authorization. For `writeCalendar` /
   * `writeReminders`, write-only maps to `"granted"`. For `readCalendar` /
   * `readReminders`, write-only maps to `"prompt"`.
   *
   * @example
   * CapacitorCalendar.checkPermission({ scope: CalendarPermissionScope.READ_CALENDAR });
   *
   * @throws {Error} `Scope must be provided.` — when `scope` is missing.
   * @throws {Error} `Invalid scope.` — when `scope` is not a valid `CalendarPermissionScope` value.
   * @throws {Error} `Unhandled permission state.` — when the native authorization status cannot be mapped.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  checkPermission(options: CheckPermissionOptions): Promise<{ result: PermissionState }>;

  /**
   * Retrieves the current state of all permissions.
   *
   * The resolved value is always nested under `result` with string keys matching
   * `CalendarPermissionScope` values (`readCalendar`, `writeCalendar`, `readReminders`,
   * `writeReminders`) and lowercase `PermissionState` string values.
   *
   * On Android, `readReminders` and `writeReminders` always resolve to `"prompt"`
   * (reminders are not supported on Android).
   *
   * On iOS 17+, write-only authorization is mapped per scope the same way as
   * {@link checkPermission}.
   *
   * @throws {Error} `Unhandled permission state.` — when a native authorization status cannot be mapped.
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
  requestPermission(options: { scope: CalendarPermissionScope }): Promise<{ result: PermissionState }>;

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
export type CheckAllPermissionsResult = Record<CalendarPermissionScope, PermissionState>;

/**
 * @platform Android, iOS
 * @since 7.1.0
 */
export type RequestAllPermissionsResult = CheckAllPermissionsResult;
