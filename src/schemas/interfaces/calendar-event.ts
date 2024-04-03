/**
 * Represents an event in the calendar.
 *
 * @interface CalendarEvent
 * @platform iOS, Android
 * @property {string} id - The unique identifier of the event.
 * @property {string} title - The title or name of the event. (Optional)
 */
export interface CalendarEvent {
  id: string;
  title?: string;
}
