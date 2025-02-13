import { CalendarSource } from "../schemas/interfaces/calendar-source";

export interface RemindersOperations {
  /**
   * Retrieves a list of calendar sources.
   *
   * @deprecated Duplicates {@link CalendarOperations#fetchAllCalendarSources}
   * @platform iOS
   * @since 6.6.0
   */
  fetchAllRemindersSources(): Promise<{ result: CalendarSource[] }>;
}
