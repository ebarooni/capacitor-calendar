import { RecurrenceFrequency } from "../types/recurrence-frequency";

export interface EventRecurrenceRule {
  /**
   * Limits a yearly recurrence to specific months of the year.
   * The values should be between 1 and 12.
   *
   * @example [1, 7]  // Means in January and July.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  byMonth?: number[];
  /**
   * Limits a monthly recurrence to specific days of the month.
   * The values should be between 1 and 31.
   *
   * @example [1, 15] // The 1st and 15th of each month.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  byMonthDay?: number[];
  /**
   * Limits a weekly recurrence to specific weekdays.
   * The values should be between 1 and 7.
   * 1 means Monday and 7 means Sunday.
   *
   * @example [1, 3, 5] // Every Monday, Wednesday and Friday
   *
   * @platform Android, iOS
   * @since 7.3.0
   */
  byWeekDay?: number[];
  /**
   * The total number of occurrences.
   * If set, the recurrence ends after this many occurrences.
   * If `count` is provided, `until` is ignored.
   *
   * @example 10
   *
   * @platform Android, iOS
   * @since 7.3.0
   */
  count?: number;
  /**
   * How often the event repeats.
   *
   * @example 'weekly'
   *
   * @platform Android, iOS
   * @since 7.3.0
   */
  frequency: RecurrenceFrequency;
  /**
   * The interval between recurrences. Use in combination with `frequency`.
   * For example, a weekly event with an interval of 2, results in the event
   * occurring every 2 weeks.
   *
   * @example 2
   *
   * @default 1
   * @platform Android, iOS
   * @since 7.3.0
   */
  interval?: number;
  /**
   * End date of the recurrence series as a Unix timestamp in milliseconds.
   *
   * @example
   * const date = new Date();
   * date.setMonth(date.getMonth() + 1);
   * const until = date.getTime();
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  until?: number;
}
