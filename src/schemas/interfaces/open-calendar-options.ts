import type { CalendarLinkProvider } from '../types/calendar-link-provider';

/**
 * @since 7.1.0
 */
export interface OpenCalendarOptions {
  /**
   * The date to open the calendar at, in milliseconds since the epoch.
   *
   * @example Date.now()
   * @default Date.now()
   * @platform Android, iOS
   * @since 7.1.0
   */
  date?: number;
  /**
   * Web calendar to open in a new browser tab, at the day of `date`.
   * Without it, `openCalendar` rejects on Web, because browsers cannot open a calendar app.
   * Yahoo has no day view and is not supported here.
   *
   * @platform Web
   * @since 8.12.0
   */
  provider?: Exclude<CalendarLinkProvider, 'yahoo'>;
}
