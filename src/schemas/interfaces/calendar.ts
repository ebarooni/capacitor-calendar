import { CalendarSource } from "./calendar-source";
import { CalendarType } from "../enums/calendar-type";

/**
 * Represents a calendar object.
 *
 * @interface Calendar
 * @platform iOS, Android
 * @property {string} id The unique identifier of the calendar.
 * @property {string} title The title or name of the calendar.
 * @property {string} color The color of the calendar.
 * @property {boolean} isImmutable Indicating whether the calendar's properties
 * can be modified.
 * @property {boolean} allowsContentModifications Indicating whether the calendar's
 * items (events or reminders) can be modified.
 * @property {CalendarType} type The type of the calendar. On iOS the type is of type
 * CalendarSourceType.
 * @property {boolean} isSubscribed Indicating whether the calendar is a subscribed calendar.
 * @property {CalendarSource} source The source of the calendar.
 */
export interface Calendar {
  /**
   * @platform iOS, Android
   */
  id: string;

  /**
   * @platform iOS, Android
   */
  title: string;

  /**
   * @platform iOS, Android
   */
  color: string;

  /**
   * @platform iOS
   */
  isImmutable?: boolean;

  /**
   * @platform iOS
   */
  allowsContentModifications?: boolean;

  /**
   * @platform iOS, Android
   */
  type?: CalendarType;

  /**
   * @platform iOS
   */
  isSubscribed?: boolean;

  /**
   * @platform iOS
   */
  source?: CalendarSource;
}
