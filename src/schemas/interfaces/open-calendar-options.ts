/**
 * @since 7.1.0
 */
export interface OpenCalendarOptions {
  /**
   * The date to open the calendar at, in milliseconds since the epoch.
   *
   * @example Date.now()
   * @default Date.now()
   * @platform Android, iOS
   * @since 7.1.0
   */
  date?: number;
}
