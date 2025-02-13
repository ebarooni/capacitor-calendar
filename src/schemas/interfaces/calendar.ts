import { CalendarSource } from "./calendar-source";
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
}
