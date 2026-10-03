import type { EventAvailability } from '../enums/event-availability';

import type { EventRecurrenceRule } from './event-recurrence-rule';

/**
 * @since 7.1.0
 */
export interface CreateEventWithPromptOptions {
  /**
   * Alert times in minutes relative to the event start.
   * Use negative numbers for reminders before the start, and positive numbers for reminders after the start.
   * On iOS only 2 alerts are supported.
   *
   * @example
   * // -1440 -> 1 day before
   * // -60 -> 1 hour before
   * // 30 -> 30 minutes after
   * [-1440, -60, 30]
   *
   * @platform iOS, Web
   * @since 7.1.0
   */
  alerts?: number[];
  /**
   * @platform Android, iOS, Web
   * @since 7.1.0
   */
  availability?: EventAvailability;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  calendarId?: string;
  /**
   * @platform Android, iOS, Web
   * @since 7.1.0
   */
  description?: string;
  /**
   * When `true`, starts a browser download of the `.ics` file after confirm.
   * Does not replace returning `ics`.
   *
   * @default true
   * @platform Web
   * @since 8.8.0
   */
  downloadIcs?: boolean;
  /**
   * @platform Android, iOS, Web
   * @since 0.1.0
   */
  endDate?: number;
  /**
   * Download filename for the `.ics` file.
   * When omitted, a name is derived from `title` (fallback `event.ics`).
   * If the value has no `.ics` extension, `.ics` is appended.
   *
   * @example 'planning-session.ics'
   * @platform Web
   * @since 8.8.0
   */
  icsFileName?: string;
  /**
   * An array of emails to invite.
   *
   * @platform Android
   * @since 7.1.0
   */
  invitees?: string[];
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
   * Rules for creating a recurring event.
   *
   * @platform Android, iOS, Web
   * @since 7.3.0
   */
  recurrence?: EventRecurrenceRule;
  /**
   * @platform Android, iOS, Web
   * @since 0.1.0
   */
  startDate?: number;
  /**
   * @platform Android, iOS, Web
   * @since 0.1.0
   */
  title?: string;
  /**
   * @platform iOS, Web
   * @since 0.1.0
   */
  url?: string;
}
