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
   * When the reminder starts, in milliseconds since the epoch.
   * Relative `alerts` use this date.
   *
   * @since 7.1.0
   */
  startDate?: number;
  /**
   * When the reminder should be completed, in milliseconds since the epoch.
   * On iOS, if `startDate` is omitted and the reminder has no start, it is set to this value.
   *
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
   * @platform iOS
   * @since 7.1.0
   */
  recurrence?: RecurrenceRule;
  /**
   * Alert times in minutes relative to the reminder start.
   * Use negative numbers for alerts before the start, and positive numbers for alerts after the start.
   *
   * On iOS only 2 alerts are supported.
   *
   * @example
   * // -1440 -> 1 day before
   * // -60 -> 1 hour before
   * // 30 -> 30 minutes after
   * [-1440, -60, 30]
   *
   * @since 7.1.0
   */
  alerts?: number[];
}
