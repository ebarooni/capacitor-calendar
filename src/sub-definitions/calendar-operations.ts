import type { Calendar } from "../schemas/interfaces/calendar";
import type { CalendarSource } from "../schemas/interfaces/calendar-source";
import type { CreateCalendarOptions } from "../schemas/interfaces/create-calendar-options";
import type { DeleteCalendarOptions } from "../schemas/interfaces/delete-calendar-options";
import type { OpenCalendarOptions } from "../schemas/interfaces/open-calendar-options";
import type { SelectCalendarsWithPromptOptions } from "../schemas/interfaces/select-calendars-with-prompt-options";

export interface CalendarOperations {
  /**
   * Save the changes to the calendar.
   *
   * @platform iOS
   * @since 7.1.0
   */
  commit(): Promise<void>;
  /**
   * Opens a system interface to choose one or multiple calendars.
   *
   * @platform iOS
   * @since 0.2.0
   */
  selectCalendarsWithPrompt(
    options?: SelectCalendarsWithPromptOptions,
  ): Promise<{ result: Calendar[] }>;
  /**
   * Retrieves a list of calendar sources.
   *
   * @platform iOS
   * @since 6.6.0
   */
  fetchAllCalendarSources(): Promise<{ result: CalendarSource[] }>;
  /**
   * Retrieves a list of all available calendars.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  listCalendars(): Promise<{ result: Calendar[] }>;
  /**
   * Retrieves the default calendar.
   *
   * @platform Android, iOS
   * @since 0.3.0
   */
  getDefaultCalendar(): Promise<{ result: Calendar | null }>;
  /**
   * Opens the calendar app.
   *
   * @example
   * CapacitorCalendar.openCalendar({ date: Date.now() });
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  openCalendar(options?: OpenCalendarOptions): Promise<void>;
  /**
   * Creates a calendar.
   *
   * @platform Android, iOS
   * @since 5.2.0
   */
  createCalendar(options: CreateCalendarOptions): Promise<{ id: string }>;
  /**
   * Deletes a calendar by id.
   *
   * @platform Android, iOS
   * @since 5.2.0
   */
  deleteCalendar(options: DeleteCalendarOptions): Promise<void>;
}
