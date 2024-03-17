/**
 * Represents a calendar object with an ID and title.
 *
 * @interface Calendar
 * @platform iOS, Android
 * @property {string} id - The unique identifier of the calendar.
 * @property {string} title - The title or name of the calendar.
 */
export interface Calendar {
    id: string;
    title: string;
}
