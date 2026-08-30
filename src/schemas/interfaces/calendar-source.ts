import type { CalendarSourceType } from '../enums/calendar-source-type';

/**
 * @since 7.1.0
 */
export interface CalendarSource {
  /**
   * @platform iOS
   * @since 7.1.0
   */
  type: CalendarSourceType;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  id: string;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  title: string;
}
