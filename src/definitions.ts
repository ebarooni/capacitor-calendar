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
  readCalendar: PermissionState;
}


/**
 * Represents the interface for the Calendar plugin in Capacitor.
 *
 * @interface
 */
export interface CapacitorCalendarPlugin {
  /**
   * Checks the current permission status of a specific permission.
   *
   * @method
   * @returns {Promise&lt;{ result: PermissionState }&gt;} – A promise that resolves with the current status of the requested permission.
   */
  checkPermission(permission: keyof CalendarPermissionStatus): Promise<{ result: PermissionState }>;

  /**
   * Checks the current permission status for all the required permissions for the plugin.
   *
   * @method
   * @returns {Promise&lt;CalendarPermissionStatus&gt;} – A promise that resolves with the current permissions status.
   */
  checkAllPermissions(): Promise<CalendarPermissionStatus>;

  /**
   * Requests authorization to a specific permission, if not already granted.
   *
   * @method
   * @returns {Promise&lt;{ result: PermissionState }&gt;} – A promise that resolves with the new permission status after the request is made.
   */
  requestPermission(permission: keyof CalendarPermissionStatus): Promise<{ result: PermissionState }>;

  /**
   * Requests authorization to all the required permissions for the plugin, if they have not already been granted.
   *
   * @method
   * @returns {Promise&lt;CalendarPermissionStatus&gt;} – A promise that resolves with the new permission statuses after the request is made.
   */
  requestAllPermissions(): Promise<CalendarPermissionStatus>;

  /**
   * Performs an action (create) on a calendar event by displaying a system prompt to the user.
   *
   * @method
   * @returns {Promise&lt;{ result: CalendarEventActionResult }&gt;} – A promise that resolves with the result of the event action attempt, which includes the status (saved, canceled, error) and a message in case of an error.
   */
  createEventWithPrompt(): Promise<{ result: CalendarEventActionResult }>;
}
