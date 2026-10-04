import type { Calendar } from './calendar';

/**
 * @since 7.3.0
 */
export interface SelectCalendarsWithPromptResult {
  /**
   * Calendars the user confirmed in the chooser.
   * Empty when the user cancels.
   *
   * @platform iOS
   * @since 7.3.0
   */
  result: Calendar[];
}
