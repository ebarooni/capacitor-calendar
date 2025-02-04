import { PermissionState } from "@capacitor/core";

/**
 * @since 7.1.0
 */
export interface RemindersAccess {
  /**
   * Requests read and write access to the reminders.
   *
   * @since 5.4.0
   * @platform iOS
   * @see {@link CalendarPermissionScope}
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSRemindersFullAccessUsageDescription` |
   * | iOS 10-16 | `NSRemindersUsageDescription` |
   */
  requestFullRemindersAccess(): Promise<{ result: PermissionState }>;
}
