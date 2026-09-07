import type { Reminder } from './reminder';

/**
 * @since 7.1.0
 */
export interface GetReminderByIdResult {
  /**
   * The reminder for the given id, or `null` when none exists.
   *
   * @platform iOS
   * @since 7.1.0
   */
  result: Reminder | null;
}
