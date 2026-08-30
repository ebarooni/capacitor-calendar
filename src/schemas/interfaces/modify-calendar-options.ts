/**
 * @since 7.2.0
 */
export interface ModifyCalendarOptions {
  /**
   * @platform Android, iOS
   * @since 7.2.0
   */
  id: string;
  /**
   * Display title of the calendar.
   *
   * On Android this updates both `CALENDAR_DISPLAY_NAME` (`title`) and
   * `Calendars.NAME` (`internalTitle`).
   *
   * At least one of `title` or `color` must be provided.
   *
   * @platform Android, iOS
   * @since 7.2.0
   */
  title?: string;
  /**
   * The color of the calendar as `#RRGGBB` or `#RRGGBBAA`.
   *
   * Omit to leave the color unchanged. At least one of `title` or `color`
   * must be provided.
   *
   * @platform Android, iOS
   * @example #007AFF
   * @since 7.2.0
   */
  color?: string;
}
