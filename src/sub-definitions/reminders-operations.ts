import type { CalendarSource } from "../schemas/interfaces/calendar-source";
import type { RemindersList } from "../schemas/interfaces/reminders-list";

export interface RemindersOperations {
  /**
   * Retrieves a list of calendar sources.
   *
   * @deprecated Duplicates {@link CalendarOperations#fetchAllCalendarSources}
   * @platform iOS
   * @since 6.6.0
   */
  fetchAllRemindersSources(): Promise<{ result: CalendarSource[] }>;
  /**
   * Opens the reminders app.
   *
   * @platform iOS
   * @since 7.1.0
   */
  openReminders(): Promise<void>;
  /**
   * Retrieves the default reminders list.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getDefaultRemindersList(): Promise<{ result: RemindersList | null }>;
  /**
   * Retrieves all available reminders lists.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getRemindersLists(): Promise<{ result: RemindersList[] }>;
}
