import type { CalendarAccess } from "./sub-definitions/calendar-access";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import type { CalendarOperations } from "./sub-definitions/calendar-operations";
import type { EventOperations } from "./sub-definitions/event-operations";
import type { RemindersAccess } from "./sub-definitions/reminders-access";
import type { RemindersOperations } from "./sub-definitions/reminders-operations";

export interface CapacitorCalendarPlugin
  extends CalendarAccess,
    RemindersAccess,
    EventOperations,
    CalendarOperations,
    RemindersOperations {
  /**
   * Retrieves the list of calendar events present in the given date range.
   *
   * @async
   * @since 0.10.0
   * @platform iOS, Android
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> readCalendar</li>
   *   <li><strong>Android:</strong> readCalendar</li>
   * </ul>
   * @param {object} options Options for defining the date range.
   * @param {number} options.startDate The start of the date range.
   * @param {number} options.endDate The end of the date range.
   * @returns {Promise<{ result: CalendarEvent[] }>} A Promise that resolves with the list of events.
   * @example
   * const { result } = await CapacitorCalendar.listEventsInRange({
   *   startDate: Date.now(),
   *   endDate: Date.now() + 6 * 7 * 24 * 60 * 60 * 1000, // 6 weeks from now
   * })
   */
  listEventsInRange(options: {
    startDate: number;
    endDate: number;
  }): Promise<{ result: CalendarEvent[] }>;
}
