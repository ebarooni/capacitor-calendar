import type { CalendarType } from '../enums/calendar-type';

import type { CalendarSource } from './calendar-source';

/**
 * @since 7.1.0
 */
export interface Calendar {
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  id: string;
  /**
   * Display title of the calendar.
   * May be `null` when the platform does not provide a title.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  title: string | null;
  /**
   * Internal name of the calendar (`CalendarContract.Calendars.NAME`).
   *
   * @platform Android
   * @since 7.1.0
   */
  internalTitle: string | null;
  /**
   * Calendar color as a hex string.
   *
   * Format: `#RRGGBB` when opaque; `#RRGGBBAA` when alpha is below fully opaque.
   * May be `null` when the platform does not provide a color.
   *
   * @platform Android, iOS
   * @example #0000FF
   * @example #0000FF80
   * @since 7.1.0
   */
  color: string | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  isImmutable: boolean | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  allowsContentModifications: boolean | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  type: CalendarType | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  isSubscribed: boolean | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  source: CalendarSource | null;
  /**
   * Indicates if the events from this calendar should be shown.
   *
   * @platform Android
   * @since 7.1.0
   */
  visible: boolean | null;
  /**
   * The account under which the calendar is registered.
   *
   * @platform Android
   * @since 7.1.0
   */
  accountName: string | null;
  /**
   * The owner of the calendar.
   *
   * @platform Android
   * @since 7.1.0
   */
  ownerAccount: string | null;
  /**
   * Maximum number of reminders allowed per event.
   *
   * @platform Android
   * @since 7.1.0
   */
  maxReminders: number | null;
  /**
   * @platform Android
   * @since 7.1.0
   */
  location: string | null;
}
