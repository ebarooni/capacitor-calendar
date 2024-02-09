import type { PermissionState } from '@capacitor/core';

/**
 * Enum for the possible results of actions performed on a calendar event.
 * This includes creating, editing, and error events.
 *
 * @enum
 */
export enum CalendarEventActionResult {
  Saved = 'saved',
  Canceled = 'canceled',
  Error = 'error'
}

/**
 * Describes the permission status for reading from the calendar.
 *
 * @interface
 */
export interface CalendarPermissionStatus {
  read: PermissionState;
}


/**
 * Represents the interface for the Calendar plugin in Capacitor.
 *
 * @interface
 */
export interface CapacitorCalendarPlugin {
  /**
   * Checks the current permission status for accessing the calendar.
   *
   * @method
   * @returns {Promise&lt;CalendarPermissionStatus&gt;} – A promise that resolves with the current permission status.
   */
  checkPermissions(): Promise<CalendarPermissionStatus>;

  /**
   * Requests permissions to access the calendar, if they have not already been granted.
   *
   * @method
   * @returns {Promise&lt;CalendarPermissionStatus&gt;} – A promise that resolves with the new permission status after the request is made.
   */
  requestPermissions(): Promise<CalendarPermissionStatus>;

  /**
   * Performs an action (create) on a calendar event by displaying a system prompt to the user.
   *
   * @method
   * @returns {Promise&lt;{ result: CalendarEventActionResult }&gt;} – A promise that resolves with the result of the event action attempt, which includes the status (saved, canceled, error) and a message in case of an error.
   */
  createEventWithPrompt(): Promise<{ result: CalendarEventActionResult }>;
}
