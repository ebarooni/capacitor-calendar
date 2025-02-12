import type { Calendar } from "../schemas/interfaces/calendar";
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
    options: SelectCalendarsWithPromptOptions,
  ): Promise<{ result: Calendar[] }>;
}
