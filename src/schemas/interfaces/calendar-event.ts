/**
 * Represents an event in the calendar.
 *
 * @interface CalendarEvent
 * @property {string} id The unique identifier of the event.
 * @property {string} title The title or name of the event. (Optional)
 * @property {string} location The location of the event. (Optional)
 * @property {string} eventColor The color of the individual event. (Optional)
 * @property {string} organizer The organizer of the event. (Optional)
 * @property {string} description The description of the event. (Optional)
 * @property {number} startDate The start date of the event. (Optional)
 * @property {number} endDate The end date of the event. (Optional)
 * @property {string} eventTimezone The timezone of the start date. (optional)
 * @property {string} eventEndTimezone The timezone of the end date. (optional)
 * @property {string} duration The duration of the event. (Optional)
 * @property {boolean} isAllDay Indicates if the event is all day. (Optional)
 * @property {string} calendarId The calendar that the event belongs to. (Optional)
 * @property {string} url The URL of the event. (Optional)
 */
export interface CalendarEvent {
  /**
   * @platform iOS, Android
   */
  id: string;

  /**
   * @platform iOS, Android
   */
  title?: string;

  /**
   * @platform iOS, Android
   */
  location?: string;

  /**
   * @platform iOS, Android
   */
  eventColor?: string;

  /**
   * @platform iOS, Android
   */
  organizer?: string;

  /**
   * @platform iOS, Android
   */
  description?: string;

  /**
   * @platform iOS, Android
   */
  startDate?: number;

  /**
   * @platform iOS, Android
   */
  endDate?: number;

  /**
   * @platform iOS, Android
   */
  eventTimezone?: {
    region: string;
    abbreviation: string;
  };

  /**
   * @platform iOS, Android
   */
  eventEndTimezone?: {
    region: string;
    abbreviation: string;
  };

  /**
   * @platform Android
   */
  duration?: string;

  /**
   * @platform iOS, Android
   */
  isAllDay?: boolean;

  /**
   * @platform iOS, Android
   */
  calendarId: string;

  /**
   * @platform iOS
   */
  url: string;
}
