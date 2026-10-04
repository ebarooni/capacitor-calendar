import type { CalendarEvent } from './calendar-event';

/**
 * @since 7.3.0
 */
export interface ListEventsInRangeResult {
  /**
   * Events that overlap the requested range.
   *
   * @platform Android, iOS
   * @since 7.3.0
   */
  result: CalendarEvent[];
}
