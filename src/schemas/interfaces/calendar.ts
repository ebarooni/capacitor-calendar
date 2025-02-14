import type { CalendarSource } from "./calendar-source";
import { CalendarType } from "../enums/calendar-type";

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
   * @platform Android, iOS
   * @since 7.1.0
   */
  title: string;
  /**
   * Internal name of the calendar (`CalendarContract.Calendars.NAME`).
   *
   * @platform Android
   * @since 7.1.0
   */
  internalTitle: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  color: string;
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
