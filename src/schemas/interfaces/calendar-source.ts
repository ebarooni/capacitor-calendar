import { CalendarSourceType } from "../enums/calendar-source-type";

/**
 * Represents the account a calendar belongs to
 *
 * @enum CalendarSource
 * @platform iOS
 * @property {CalendarSourceType} type The type of the source object.
 * @property {string} id A unique identifier for the source object.
 * @property {string} title The name of the source object.
 */
export interface CalendarSource {
  type: CalendarSourceType;
  id: string;
  title: string;
}
