import type { Reminder } from './reminder';

/**
 * @since 5.3.0
 */
export interface GetRemindersFromListsResult {
  /**
   * Reminders from the requested lists.
   *
   * @platform iOS
   * @since 5.3.0
   */
  result: Reminder[];
}
