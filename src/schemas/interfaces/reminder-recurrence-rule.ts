import { ReminderRecurrenceFrequency } from "../enums/reminder-recurrence-frequency";

/**
 * @deprecated Use `RecurrenceRule`.
 */
export interface ReminderRecurrenceRule {
  /**
   * @deprecated Use `RecurrenceRule.frequency`.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  frequency: ReminderRecurrenceFrequency;
  /**
   * @deprecated Use `RecurrenceRule.interval`.
   */
  interval: number;
  /**
   * @deprecated Use `RecurrenceRule.end`.
   */
  end?: number;
}
