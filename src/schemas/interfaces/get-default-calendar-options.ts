/**
 * @since 8.4.0
 */
export interface GetDefaultCalendarOptions {
  /**
   * When there is no system default calendar, use the first available calendar.
   *
   * @default false
   * @platform Android, iOS
   * @since 8.4.0
   */
  useFallbackCalendar?: boolean;
}
