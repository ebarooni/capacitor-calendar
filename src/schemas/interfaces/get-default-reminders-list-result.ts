import type { RemindersList } from './reminders-list';

/**
 * @since 7.1.0
 */
export interface GetDefaultRemindersListResult {
  /**
   * The default reminders list, or `null` when none exists.
   *
   * @platform iOS
   * @since 7.1.0
   */
  result: RemindersList | null;
}
