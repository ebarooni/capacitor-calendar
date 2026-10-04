import type { SystemOrHexColor } from '../types/system-or-hex-color';

/**
 * @since 7.2.0
 */
export interface ModifyCalendarOptions {
  /**
   * @platform Android, iOS
   * @since 7.2.0
   */
  id: string;
  /**
   * Display title of the calendar.
   *
   * On Android this updates both `CALENDAR_DISPLAY_NAME` (`title`) and
   * `Calendars.NAME` (`internalTitle`).
   *
   * @platform Android, iOS
   * @since 7.2.0
   */
  title?: string;
  /**
   * Named color (`blue`, …) or hex `#RRGGBB` / `#RRGGBBAA`.
   * If omitted, the color is left unchanged.
   * On Android, only hex is accepted; named colors reject with `Invalid color format.`
   *
   * @platform Android, iOS
   * @example 'indigo'
   * @example #007AFF
   * @since 7.2.0
   */
  color?: SystemOrHexColor;
}
