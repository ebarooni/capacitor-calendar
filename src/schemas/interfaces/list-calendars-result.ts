import type { Calendar } from './calendar';

/**
 * @since 7.3.0
 */
export interface ListCalendarsResult {
  /**
   * All available calendars.
   *
   * @platform Android, iOS
   * @since 7.3.0
   */
  result: Calendar[];
}
