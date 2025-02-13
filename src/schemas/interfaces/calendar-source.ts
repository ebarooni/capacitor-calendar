import { CalendarSourceType } from "../enums/calendar-source-type";

/**
 * @since 7.1.0
 */
export interface CalendarSource {
  /**
   * @since 7.1.0
   */
  type: CalendarSourceType;
  /**
   * @since 7.1.0
   */
  id: string;
  /**
   * @since 7.1.0
   */
  title: string;
}
