import type { RecurrenceRule } from './recurrence-rule';

/**
 * @since 7.1.0
 */
export interface ModifyReminderOptions {
  /**
   * Alert times in minutes relative to the reminder start.
   * Use negative numbers for alerts before the start, and positive numbers for alerts after the start.
   * Omit or pass `undefined` to leave existing alerts unchanged.
   * Pass `null` or an empty array `[]` to clear alerts.
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
  alerts?: number[] | null;
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
   * When the reminder was completed, in milliseconds since the epoch.
   * Omit or pass `undefined` to leave the existing value unchanged.
   * Since 8.7.0, pass `null` to clear.
   *
   * @since 7.1.0
   */
  completionDate?: number | null;
  /**
   * When the reminder is due, in milliseconds since the epoch.
   * On iOS, if `startDate` is omitted and the reminder has no start, it is set to this value.
   * Omit or pass `undefined` to leave the existing value unchanged.
   * Since 8.7.0, pass `null` to clear.
   *
   * @since 7.1.0
   */
  dueDate?: number | null;
  /**
   * @since 7.1.0
   */
  id: string;
  /**
   * @since 7.1.0
   */
  isCompleted?: boolean;
  /**
   * @since 7.1.0
   */
  listId?: string;
  /**
   * Location for the reminder.
   * Omit or pass `undefined` to leave the existing value unchanged.
   * Since 8.7.0, pass `null` to clear.
   *
   * @since 7.1.0
   */
  location?: string | null;
  /**
   * Notes for the reminder.
   * Omit or pass `undefined` to leave the existing value unchanged.
   * Since 8.7.0, pass `null` to clear.
   *
   * @since 7.1.0
   */
  notes?: string | null;
  /**
   * @since 7.1.0
   */
  priority?: number;
  /**
   * Recurrence rule for the reminder.
   * Omit or pass `undefined` to leave the existing value unchanged.
   * Since 8.7.0, pass `null` to clear.
   *
   * @platform iOS
   * @since 7.1.0
   */
  recurrence?: RecurrenceRule | null;
  /**
   * When the reminder starts, in milliseconds since the epoch.
   * Relative `alerts` use this date.
   * Omit or pass `undefined` to leave the existing value unchanged.
   * Since 8.7.0, pass `null` to clear.
   *
   * @since 7.1.0
   */
  startDate?: number | null;
  /**
   * @since 7.1.0
   */
  title?: string;
  /**
   * URL associated with the reminder.
   * Omit or pass `undefined` to leave the existing value unchanged.
   * Since 8.7.0, pass `null` to clear.
   *
   * @since 7.1.0
   */
  url?: string | null;
}
