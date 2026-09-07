import type { RecurrenceFrequency } from '../types/recurrence-frequency';

/**
 * @since 7.1.0
 */
export interface RecurrenceRule {
  /**
   * How often the reminder repeats.
   *
   * @example 'weekly'
   * @platform iOS
   * @since 7.1.0
   */
  frequency: RecurrenceFrequency;
  /**
   * How often it repeats (e.g. 1 for every occurrence, 2 for every second occurrence).
   *
   * @platform iOS
   * @since 7.1.0
   */
  interval: number;
  /**
   * End of the recurrence series as a Unix timestamp in milliseconds.
   *
   * @platform iOS
   * @since 7.1.0
   */
  end?: number;
}
