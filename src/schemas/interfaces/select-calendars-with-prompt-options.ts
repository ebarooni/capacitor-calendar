import { CalendarChooserDisplayStyle } from "../enums/calendar-chooser-display-style";
import { CalendarChooserSelectionStyle } from "../enums/calendar-chooser-selection-style";

/**
 * @since 7.1.0
 */
export interface SelectCalendarsWithPromptOptions {
  /**
   * @since 7.1.0
   */
  displayStyle: CalendarChooserDisplayStyle;
  /**
   * @since 7.1.0
   */
  selectionStyle: CalendarChooserSelectionStyle;
}
