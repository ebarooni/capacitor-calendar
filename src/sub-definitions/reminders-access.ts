import type { PermissionState } from '@capacitor/core';

/**
 * @since 7.1.0
 */
export interface RemindersAccess {
  /**
   * Requests read and write access to the reminders.
   * Resolves with `"granted"` or `"denied"` (never `"prompt"`).
   * A grant covers both `readReminders` and `writeReminders`.
   *
   * @permissions
   * | Platform  | Required |
   * |-----------|---------------------|
   * | iOS 17+   | `NSRemindersFullAccessUsageDescription` |
   * | iOS 10-16 | `NSRemindersUsageDescription` |
   *
   * @throws {Error} when EventKit fails or required Info.plist keys are missing.
   *
   * @platform iOS
   * @see {@link CalendarPermissionScope}
   * @since 5.4.0
   */
  requestFullRemindersAccess(): Promise<{ result: PermissionState }>;
}
