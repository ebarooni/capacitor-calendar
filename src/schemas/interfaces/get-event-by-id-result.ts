import type { CalendarEvent } from './calendar-event';

/**
 * @since 8.11.0
 */
export interface GetEventByIdResult {
  /**
   * The event for the given id, or `null` when none exists.
   *
   * @platform Android, iOS
   * @since 8.11.0
   */
  result: CalendarEvent | null;
}
