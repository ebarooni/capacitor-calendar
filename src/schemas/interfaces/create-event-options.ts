import type { EventAvailability } from '../enums/event-availability';

import type { EventGuest } from './event-guest';
import type { EventRecurrenceRule } from './event-recurrence-rule';

/**
 * @since 7.1.0
 */
export interface CreateEventOptions {
  /**
   * Alert times in minutes relative to the event start.
   * Use negative numbers for alerts before the start, and positive numbers for alerts after the start.
   *
   * @example
   * // -1440 -> 1 day before
   * // -60 -> 1 hour before
   * // 30 -> 30 minutes after
   * [-1440, -60, 30]
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  alerts?: number[];
  /**
   * The event guests.
   *
   * @platform Android
   * @since 7.1.0
   */
  attendees?: EventGuest[];
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  availability?: EventAvailability;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  calendarId?: string;
  /**
   * @example #6750A4
   * @platform Android
   * @since 7.1.0
   */
  color?: string;
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
   * @platform Android, iOS
   * @since 7.1.0
   */
  description?: string;
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
   * @platform Android, iOS
   * @since 0.1.0
   */
  location?: string;
  /**
   * Email of the event organizer.
   *
   * @platform Android
   * @since 7.1.0
   */
  organizer?: string;
  /**
   * Rules for creating a recurring event.
   *
   * @platform Android, iOS
   * @since 7.3.0
   */
  recurrence?: EventRecurrenceRule;
  /**
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  startDate?: number;
  /**
   * @platform Android, iOS
   * @since 0.4.0
   */
  title: string;
  /**
   * @platform iOS
   * @since 0.1.0
   */
  url?: string;
}
