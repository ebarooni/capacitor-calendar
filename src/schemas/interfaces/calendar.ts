/**
 * Represents a calendar object.
 *
 * @interface Calendar
 * @platform iOS, Android
 * @property {string} id The unique identifier of the calendar.
 * @property {string} title The title or name of the calendar.
 * @property {string} color The color of the calendar.
 */
export interface Calendar {
  id: string;
  title: string;
  color: string;
}
