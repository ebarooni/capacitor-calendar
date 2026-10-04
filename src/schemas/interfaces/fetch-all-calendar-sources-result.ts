import type { CalendarSource } from './calendar-source';

/**
 * @since 7.3.0
 */
export interface FetchAllCalendarSourcesResult {
  /**
   * All calendar sources (accounts) known to EventKit.
   *
   * @platform iOS
   * @since 7.3.0
   */
  result: CalendarSource[];
}
