import { EventAvailability } from "../enums/event-availability";
import type { EventGuest } from "./event-guest";

/**
 * @since 7.1.0
 */
export interface CreateEventOptions {
  /**
   * @platform Android, iOS
   * @since 0.4.0
   */
  title: string;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  calendarId?: string;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  location?: string;
  /**
   *
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
   *
   * Example: [-1440, -60, 30] => 1 day before, 1 hour before, and 30 minutes after the start.
   *
   * @platform Android, iOS
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
   * Email of the event organizer.
   *
   * @platform Android
   * @since 7.1.0
   */
  organizer?: string;
  /**
   * @example #6750A4
   * @platform Android
   * @since 7.1.0
   */
  color?: string;
  /**
   * Duration of the event in RFC2445 format.
   *
   * @example P1D (1 day), P3W (3 weeks), P2DT4H30M (2 days, 4 hours, and 30 minutes).
   * @platform Android
   * @see {@link https://datatracker.ietf.org/doc/html/rfc2445}
   * @since 7.1.0
   */
  duration?: string;
  /**
   * Whether to save immediately (`true`) or batch changes for later (`false`).
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 7.1.0
   */
  commit?: boolean;
  /**
   * The event guests.
   *
   * @platform Android
   * @since 7.1.0
   */
  attendees?: EventGuest[];
}
