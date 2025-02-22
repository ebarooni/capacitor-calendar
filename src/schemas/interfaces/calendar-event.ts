import { EventAvailability } from "../enums/event-availability";
import type { EventGuest } from "./event-guest";
import { EventStatus } from "../enums/event-status";

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
  calendarId: string;
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
   */
  isAllDay: boolean;
  /**
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
   * @see {@link https://developer.apple.com/documentation/eventkit/ekevent/birthdaycontactidentifier}
   * @platform iOS
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
  attendees: EventGuest[];
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  timezone: string | null;
}
