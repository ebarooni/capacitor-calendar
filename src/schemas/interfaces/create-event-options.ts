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
   * @platform Android, iOS, Web
   * @since 7.1.0
   */
  alerts?: number[];
  /**
   * The event guests.
   *
   * @platform Android, Web
   * @since 7.1.0
   */
  attendees?: EventGuest[];
  /**
   * @platform Android, iOS, Web
   * @since 7.1.0
   */
  availability?: EventAvailability;
  /**
   * Target calendar id. Has no effect on Web (ICS export has no calendar store).
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  calendarId?: string;
  /**
   * Event color. Has no effect on Web.
   *
   * @example #6750A4
   * @platform Android
   * @since 7.1.0
   */
  color?: string;
  /**
   * Whether to save immediately (`true`) or batch changes for later (`false`).
   * Has no effect on Web.
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 7.1.0
   */
  commit?: boolean;
  /**
   * @platform Android, iOS, Web
   * @since 7.1.0
   */
  description?: string;
  /**
   * Duration of the event in RFC2445 format (for example `PT1H`, `P1D`, `P2DT4H30M`).
   * On Web, used to compute `DTEND` when `endDate` is omitted. If both are set, `endDate` wins.
   *
   * @example P1D (1 day), P3W (3 weeks), P2DT4H30M (2 days, 4 hours, and 30 minutes).
   * @platform Android, Web
   * @see {@link https://datatracker.ietf.org/doc/html/rfc2445}
   * @since 7.1.0
   */
  duration?: string;
  /**
   * End time as Unix milliseconds.
   * On Web, timed events write `DTEND` in UTC (`…Z`); all-day events use a local calendar date.
   *
   * @platform Android, iOS, Web
   * @since 0.1.0
   */
  endDate?: number;
  /**
   * Download filename for the `.ics` file.
   * When omitted, a name is derived from `title` (fallback `event.ics`).
   * If the value has no `.ics` extension, `.ics` is appended.
   *
   * @example 'team-standup.ics'
   * @platform Web
   * @since 8.5.0
   */
  icsFileName?: string;
  /**
   * @platform Android, iOS, Web
   * @since 0.1.0
   */
  isAllDay?: boolean;
  /**
   * @platform Android, iOS, Web
   * @since 0.1.0
   */
  location?: string;
  /**
   * Email of the event organizer.
   *
   * @platform Android, Web
   * @since 7.1.0
   */
  organizer?: string;
  /**
   * Rules for creating a recurring event.
   *
   * @platform Android, iOS, Web
   * @since 7.3.0
   */
  recurrence?: EventRecurrenceRule;
  /**
   * Start time as Unix milliseconds.
   * On Web, timed events write `DTSTART` in UTC (`…Z`); all-day events use a local calendar date.
   *
   * @platform Android, iOS, Web
   * @since 0.1.0
   */
  startDate?: number;
  /**
   * @platform Android, iOS, Web
   * @since 0.4.0
   */
  title: string;
  /**
   * @platform iOS, Web
   * @since 0.1.0
   */
  url?: string;
}
