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
   * @platform Android
   */
  eventColor?: string;

  /**
   * @platform Android
   */
  organizer?: string;

  /**
   * @platform Android
   */
  description?: string;

  /**
   * @platform Android
   */
  startDate?: number;

  /**
   * @platform Android
   */
  endDate?: number;

  /**
   * @platform Android
   */
  eventTimezone?: string;

  /**
   * @platform Android
   */
  eventEndTimezone?: string;

  /**
   * @platform Android
   */
  duration?: string;

  /**
   * @platform Android
   */
  isAllDay?: boolean;

  /**
   * @platform Android
   */
  calendarId: string;
}
