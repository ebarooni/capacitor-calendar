import type { Calendar } from './calendar';

/**
 * @since 8.4.0
 */
export interface SelectCalendarsWithPromptResult {
  /**
   * Calendars the user confirmed in the chooser.
   * Empty when the user cancels.
   *
   * @platform iOS
   * @since 8.4.0
   */
  result: Calendar[];
}
