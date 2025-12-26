import type { RecurrenceRule } from './recurrence-rule';

/**
 * @since 7.1.0
 */
export interface ModifyReminderOptions {
  /**
   * @since 7.1.0
   */
  id: string;
  /**
   * @since 7.1.0
   */
  title?: string;
  /**
   * @since 7.1.0
   */
  listId?: string;
  /**
   * @since 7.1.0
   */
  priority?: number;
  /**
   * @since 7.1.0
   */
  isCompleted?: boolean;
  /**
   * @since 7.1.0
   */
  startDate?: number;
  /**
   * @since 7.1.0
   */
  dueDate?: number;
  /**
   * @since 7.1.0
   */
  completionDate?: number;
  /**
   * @since 7.1.0
   */
  notes?: string;
  /**
   * @since 7.1.0
   */
  url?: string;
  /**
   * @since 7.1.0
   */
  location?: string;
  /**
   * @since 7.1.0
   */
  recurrence?: RecurrenceRule;
  /**
   * Alert times in minutes relative to the reminder date.
   * Use negative numbers for reminders before the date, and positive numbers for reminders after.
   *
   * Example: [-30, 15] => 30 minutes before and 15 minutes after.
   *
   * @since 7.1.0
   */
  alerts?: number[];
}
