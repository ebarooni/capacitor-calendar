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
   * Alert times in minutes relative to the event start.
   * Use negative numbers for reminders before the start, and positive numbers for reminders after the start.
   * On iOS only 2 alerts are supported.
   *
   * @example
   * const alerts = [-1440, -60, 30]; // 1 day before, 1 hour before, and 30 minutes after
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
   * @since 7.1.0
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
