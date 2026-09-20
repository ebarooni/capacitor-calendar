import type { RecurrenceRule } from './recurrence-rule';

/**
 * @since 7.1.0
 */
export interface CreateReminderOptions {
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
  /**
   * Whether to save immediately (`true`) or batch changes for later (`false`).
   * Pass `false` to batch multiple changes and commit them together using `CapacitorCalendar.commit()`, which is more efficient than committing each save individually.
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 8.7.0
   */
  commit?: boolean;
  /**
   * @since 7.1.0
   */
  completionDate?: number;
  /**
   * When the reminder should be completed, in milliseconds since the epoch.
   * On iOS, if `startDate` is omitted, it is set to this value.
   *
   * @since 7.1.0
   */
  dueDate?: number;
  /**
   * @since 7.1.0
   */
  isCompleted?: boolean;
  /**
   * @since 7.1.0
   */
  listId?: string;
  /**
   * @since 7.1.0
   */
  location?: string;
  /**
   * @since 7.1.0
   */
  notes?: string;
  /**
   * @since 7.1.0
   */
  priority?: number;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  recurrence?: RecurrenceRule;
  /**
   * When the reminder starts, in milliseconds since the epoch.
   * Relative `alerts` use this date.
   *
   * @since 7.1.0
   */
  startDate?: number;
  /**
   * @since 7.1.0
   */
  title: string;
  /**
   * @since 7.1.0
   */
  url?: string;
}
