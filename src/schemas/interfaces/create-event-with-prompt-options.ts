import { EventAvailability } from "../enums/event-availability";

/**
 * @since 7.1.0
 */
export interface CreateEventWithPromptOptions {
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  title?: string;
  /**
   * @platform iOS
   * @since 0.1.0
   */
  calendarId?: string;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  location?: string;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  startDate?: number;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  endDate?: number;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  isAllDay?: boolean;
  /**
   * Sets alerts before the start of the event in minutes.
   * On iOS only 2 alerts are supported.
   *
   * @example
   * // 10mins before and 30mins after the event
   * const alerts: [-10, 30]
   *
   * @platform iOS
   * @since 7.1.0
   */
  alerts?: number[];
  /**
   * @platform iOS
   * @since 0.1.0
   */
  url?: string;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  description?: string;
  /**
   * @platform Android, iOS
   * @see 7.1.0
   */
  availability?: EventAvailability;
  /**
   * An array of emails to invite.
   *
   * @platform Android
   * @since 7.1.0
   */
  invitees?: string[];
}
