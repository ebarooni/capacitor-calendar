import type { AttendeeRole } from '../enums/attendee-role';
import type { AttendeeStatus } from '../enums/attendee-status';
import type { AttendeeType } from '../enums/attendee-type';
import type { EventAvailability } from '../enums/event-availability';
import type { EventStatus } from '../enums/event-status';

/**
 * @since 7.1.0
 */
export interface CalendarEvent {
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
  calendarId: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  location: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  startDate: number;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  endDate: number;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  isAllDay: boolean;
  /**
   * Alert times in minutes relative to the event start.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  alerts: number[];
  /**
   * @platform iOS
   * @since 7.1.0
   */
  url: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  description: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  availability: EventAvailability | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  organizer: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  color: string | null;
  /**
   * @platform Android
   * @since 7.1.0
   */
  duration: string | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  isDetached: boolean | null;
  /**
   * @platform iOS
   * @see {@link https://developer.apple.com/documentation/eventkit/ekevent/birthdaycontactidentifier}
   * @since 7.1.0
   */
  birthdayContactIdentifier: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  status: EventStatus | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  creationDate: number | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  lastModifiedDate: number | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  attendees: {
    /**
     * @platform Android
     * @since 7.1.0
     */
    email: string | null;
    /**
     * @platform Android, iOS
     * @since 7.1.0
     */
    name: string | null;
    /**
     * Equivalent to ATTENDEE_RELATIONSHIP on Android.
     * Equivalent to EKParticipantRole on iOS.
     *
     * @platform Android, iOS
     * @since 7.1.0
     */
    role: AttendeeRole | null;
    /**
     * Equivalent to ATTENDEE_STATUS on Android.
     * Equivalent to EKParticipantStatus on iOS.
     *
     * @platform Android, iOS
     * @since 7.1.0
     */
    status: AttendeeStatus | null;
    /**
     * Equivalent to ATTENDEE_TYPE on Android.
     * Equivalent to EKParticipantType on iOS.
     *
     * @platform Android, iOS
     * @since 7.1.0
     */
    type: AttendeeType | null;
  }[];
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  timezone: string | null;
}
