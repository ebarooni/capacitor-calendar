import type { CalendarSource } from './calendar-source';

/**
 * @since 8.4.0
 */
export interface FetchAllCalendarSourcesResult {
  /**
   * All calendar sources (accounts) known to EventKit.
   *
   * @platform iOS
   * @since 8.4.0
   */
  result: CalendarSource[];
}
