import { ReminderRecurrenceFrequency } from '../enums/reminder-recurrence-frequency';

export interface ReminderRecurrenceRule {
  /**
   * How frequent should the reminder repeat.
   *
   * @example
   * // if frequency is set to weekly, the reminder will repeat on a weekly basis.
   * const rules: ReminderRecurrenceRule = {
   *     frequency: ReminderRecurrenceFrequency.WEEKLY,
   *     interval: 1,
   * }
   */
  frequency: ReminderRecurrenceFrequency;

  /**
   * The interval should be a number greater than 0. For values lower than 1 the method will throw an error.
   *
   * @example
   * // if interval is set to 2 and frequency is set to daily, the reminder will repeat every 2 days.
   * const rules: ReminderRecurrenceRule = {
   *     frequency: ReminderRecurrenceFrequency.DAILY,
   *     interval: 2,
   * }
   */
  interval: number;

  /**
   * When provided, the reminder will stop repeating at the given time.
   *
   * @example
   * const rules: ReminderRecurrenceRule = {
   *     frequency: ReminderRecurrenceFrequency.MONTHLY,
   *     interval: 10,
   *     end: Date.now()
   * }
   */
  end?: number;
}
