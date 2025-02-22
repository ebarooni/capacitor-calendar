import type { PermissionState } from "@capacitor/core";

/**
 * @since 7.1.0
 */
export interface RemindersAccess {
  /**
   * Requests read and write access to the reminders.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSRemindersFullAccessUsageDescription` |
   * | iOS 10-16 | `NSRemindersUsageDescription` |
   *
   * @platform iOS
   * @see {@link CalendarPermissionScope}
   * @since 5.4.0
   */
  requestFullRemindersAccess(): Promise<{ result: PermissionState }>;
}
