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
   * Alert times in minutes relative to the event start.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  alerts: number[];
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
  availability: EventAvailability | null;
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
  calendarId: string | null;
  /**
   * A stable external id for this calendar item.
   *
   * On iOS this is set when the system provides it. On Android and web it is
   * always `null`. Use `masterId` on Android for the series master id.
   *
   * Do not treat this field as the same as `masterId`.
   * They identify different things on different platforms.
   *
   * For non-detached occurrences of a series, this value is shared across
   * those occurrences. On one device, `id` is often already shared for them.
   * This field is mainly useful as a stable id across devices.
   *
   * Detached exceptions usually get a new identifier.
   * You cannot find the original series from this value.
   * Use `isDetached` and `isPartOfSeries` instead.
   * Do not pass this value where the plugin expects an event `id`.
   *
   * @example "1A2B3C4D-...."
   * @platform iOS
   * @see {@link https://developer.apple.com/documentation/eventkit/ekcalendaritem/calendaritemexternalidentifier}
   * @since 8.6.0
   */
  calendarItemExternalIdentifier: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  color: string | null;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  creationDate: number | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  description: string | null;
  /**
   * @platform Android
   * @since 7.1.0
   */
  duration: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  endDate: number;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  id: string;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  isAllDay: boolean;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  isDetached: boolean | null;
  /**
   * Whether this event belongs to a recurring series.
   *
   * `true` for series occurrences and detached exceptions.
   * `false` for one-off events.
   *
   * Detached exceptions also set `isDetached` (iOS only).
   *
   * @example true
   * @platform Android, iOS
   * @since 8.6.0
   */
  isPartOfSeries: boolean;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  lastModifiedDate: number | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  location: string | null;
  /**
   * The id of the series master for this listed occurrence.
   *
   * On Android this is always a string. On iOS and web it is always `null`.
   * iOS has no public master event id. Use `calendarItemExternalIdentifier`
   * on iOS instead.
   *
   * Do not treat this field as the same as `calendarItemExternalIdentifier`.
   * They identify different things on different platforms.
   *
   * If this row is the master or a one-shot event, `masterId` equals `id`.
   * If this row is an exception, `id` is the exception and `masterId` is the
   * series master.
   *
   * To modify or delete the whole series, pass `masterId` as the `id` option.
   * You still need `span` and `instanceDate` when those APIs require them.
   *
   * In rare sync cases, an exception may temporarily report `masterId` equal
   * to `id` until the platform links it to the series master.
   *
   * @example "42"
   * @platform Android
   * @since 8.6.0
   */
  masterId: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  organizer: string | null;
  /**
   * Start time of the recurring series, in milliseconds since the epoch.
   *
   * Equals `startDate` for one-off events. On iOS, equals `startDate` when
   * the series start is not available for a detached exception.
   *
   * @example 1719792000000
   * @platform Android, iOS
   * @since 8.6.0
   */
  seriesStartDate: number;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  startDate: number;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  status: EventStatus | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  timezone: string | null;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  title: string;
  /**
   * @platform iOS
   * @since 7.1.0
   */
  url: string | null;
}
