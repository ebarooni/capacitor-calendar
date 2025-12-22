import { RecurrenceFrequency } from "../types/recurrence-frequency";

/**
 * @since 7.1.0
 */
export interface RecurrenceRule {
  /**
   * @since 7.1.0
   */
  frequency: RecurrenceFrequency;
  /**
   * How often it repeats (e.g. 1 for every occurrence, 2 for every second occurrence).
   *
   * @since 7.1.0
   */
  interval: number;
  /**
   * Timestamp of when the recurrence ends.
   *
   * @since 7.1.0
   */
  end?: number;
}
