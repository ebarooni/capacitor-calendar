/**
 * Links that open a web calendar with a new event already filled in.
 *
 * @since 8.12.0
 */
export interface CalendarLinks {
  /**
   * Google Calendar.
   * Supports recurrence and guests.
   *
   * @since 8.12.0
   */
  google: string;
  /**
   * Outlook.com (personal accounts).
   *
   * @since 8.12.0
   */
  outlook: string;
  /**
   * Outlook on Microsoft 365 (work and school accounts).
   *
   * @since 8.12.0
   */
  office365: string;
  /**
   * Yahoo Calendar.
   *
   * @since 8.12.0
   */
  yahoo: string;
}
