import type { CalendarChooserDisplayStyle } from '../enums/calendar-chooser-display-style';

/**
 * @since 7.1.0
 */
export interface SelectCalendarsWithPromptOptions {
  /**
   * @default CalendarChooserDisplayStyle.ALL_CALENDARS
   * @since 7.1.0
   */
  displayStyle?: CalendarChooserDisplayStyle;
  /**
   * Allow multiple selections.
   *
   * @default false
   * @since 7.1.0
   */
  multiple?: boolean;
}
