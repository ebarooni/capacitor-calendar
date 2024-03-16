import type { PermissionState } from '@capacitor/core';

/**
 * Enum representing the selection style for the calendar chooser.
 * @enum
 * @platform iOS
 */
export enum CalendarChooserSelectionStyle {
  /**
   * Allows only a single selection in the calendar chooser.
   */
  SINGLE,

  /**
   * Allows multiple selections in the calendar chooser.
   */
  MULTIPLE
}

/**
 * Enum representing the display styles for the calendar chooser.
 * @enum
 * @platform iOS
 */
export enum CalendarChooserDisplayStyle {
  /**
   * Display all calendars available for selection.
   */
  ALL_CALENDARS,

  /**
   * Display only writable calendars available for selection.
   */
  WRITABLE_CALENDARS_ONLY
}

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

/**
 * Represents the status of calendar permissions.
 * @interface
 */
export interface CalendarPermissionStatus {
  /**
   * Represents the permission state for reading calendar.
   * @platform iOS, Android
   */
  readCalendar: PermissionState;
  /**
   * Represents the permission state for writing calendar.
   * @platform iOS, Android
   */
  writeCalendar: PermissionState;
  /**
   * Represents the permission state for writing reminders.
   * @platform iOS
   */
  writeReminders: PermissionState;
}

export interface CapacitorCalendarPlugin {
  /**
   * Checks the current authorization status of a specific permission.
   *
   * @method
   * @platform iOS, Android
   * @param options An object with the name of the permission
   * @returns {Promise&lt;{ result: PermissionState }&gt;} – A promise that resolves with the current status of the requested permission.
   * @example
   * const status = await this.checkPermission({ alias: 'readCalendar' });
   */
  checkPermission(options: { alias: keyof CalendarPermissionStatus }): Promise<{ result: PermissionState }>;

  /**
   * Checks the current authorization status of all the required permissions for the plugin.
   *
   * @method
   * @platform iOS, Android
   * @returns {Promise&lt;CalendarPermissionStatus&gt;} – A promise that resolves with an object containing all the permissions and their status.
   * @example
   * const permissionsStatus = await this.checkAllPermissions();
   */
  checkAllPermissions(): Promise<CalendarPermissionStatus>;

  /**
   * Requests authorization to a specific permission, if not already granted.
   * If the permission is already granted, it will directly return the status.
   *
   * @method
   * @platform iOS, Android
   * @param options An object with the name of the permission
   * @returns {Promise&lt;{ result: PermissionState }&gt;} – A promise that resolves with the new permission status after the request is made.
   * @example
   * const result = await this.requestPermission({ alias: 'readCalendar' });
   */
  requestPermission(options: { alias: keyof CalendarPermissionStatus }): Promise<{ result: PermissionState }>;

  /**
   * Requests authorization to all the required permissions for the plugin, if they have not already been granted.
   *
   * @method
   * @platform iOS, Android
   * @returns {Promise&lt;CalendarPermissionStatus&gt;} – A promise that resolves with the new permission statuses after the request is made.
   * @example
   * const permissionResults = await this.requestAllPermissions();
   */
  requestAllPermissions(): Promise<CalendarPermissionStatus>;

  /**
   * Creates an event in the calendar by using the native calendar.
   * On iOS opens a native sheet and on Android opens an intent.
   * This method does not need any read or write authorization from the user on iOS. However, the entries in the Info.plist file are still needed.
   * On Android, the user has to authorize for read access.
   *
   * @method
   * @platform iOS, Android
   * @returns {Promise&lt;{ eventCreated: boolean }&gt;} – A promise that resolves with the result of the action.
   * @example
   * let result: CalendarEventActionResult;
   * if (capacitor.getPlatform() === 'android') {
   *     const readCalendarStatus = (await this.requestPermission({ alias: 'readCalendar' })).result;
   *     if (readCalendarStatus === 'granted') {
   *         result = await this.createEventWithPrompt();
   *     } else {
   *         //  handle the case when user rejects the permission
   *     }
   * } else {
   *     result = await this.createEventWithPrompt();
   * }
   */
  createEventWithPrompt(): Promise<{ eventCreated: boolean }>;

  /**
   * Presents a prompt to the user to select calendars. This method is available only on iOS.
   *
   * @method selectCalendarsWithPrompt
   * @platform iOS
   * @param {object} options - Options for customizing the display and selection styles of the calendar chooser.
   * @async
   * @returns { Promise<{ result: Calendar[] }> } A promise that resolves with an array of selected calendars,
   * where each calendar object contains an ID and a title.
   * @example
   * if (capacitor.getPlatform() === 'ios') {
   *     const { result } = await selectCalendarsWithPrompt();
   *     console.log(result); // [{ id: '1', title: 'Work Calendar' }]
   * }
   */
  selectCalendarsWithPrompt(options: {
    displayStyle: CalendarChooserDisplayStyle,
    selectionStyle: CalendarChooserSelectionStyle
  }): Promise<{ result: Calendar[] }>


  /**
   * Retrieves a list of calendars available on the device.
   *
   * @async
   * @method listCalendars
   * @platform iOS, Android
   * @returns {Promise<{ result: Calendar[] }>} A promise that resolves with an array of calendars available on the device.
   * Each calendar object in the array contains an ID and a title.
   * @example
   * const { result } = await listCalendars();
   * console.log(result); // [{ id: '1', title: 'Work Calendar' }, { id: '2', title: 'Personal Calendar' }]
   */
  listCalendars(): Promise<{ result: Calendar[] }>;

  /**
   * Retrieves the default calendar set on the device.
   *
   * @method getDefaultCalendar
   * @platform iOS, Android
   * @returns {Promise<{ result: Calendar }>} A promise that resolves with the default calendar set on the device.
   * The returned calendar object contains an ID and a title.
   * @example
   * const { result } = await getDefaultCalendar();
   * console.log(result); // { id: '1', title: 'Default Calendar' }
   */
  getDefaultCalendar(): Promise<{ result: Calendar }>;

  /**
   * Creates an event with the provided options.
   *
   * @method createEvent
   * @platform iOS, Android
   * @param {object} options - Options for creating the event.
   * @param {string} options.title - The title of the event.
   * @param {string} options.calendarId - The id of the destination calendar. (Optional)
   * @param {string} [options.location] - The location of the event. (Optional)
   * @param {Date} [options.startDate] - The start date and time of the event. (Optional)
   * @param {Date} [options.endDate] - The end date and time of the event. (Optional)
   * @param {boolean} [options.isAllDay] - Weather the event is for the entire day or not. (Optional)
   * @returns {Promise<{ eventCreated: boolean }>} A Promise that resolves with an object indicating whether the event was created successfully.
   * The resolved object has a property 'eventCreated' which is a boolean value representing whether the event was created.
   * @example
   * const now = Date.now();
   * const eventOptions = {
   *   title: 'Team Meeting',
   *   location: 'Conference Room A',
   *   startDate: new Date(now),
   *   endDate: new Date(now + 2 * 60 * 60 * 1000),
   *   isAllDay: false
   * };
   * const { eventCreated } = await createEvent(eventOptions);
   * console.log(eventCreated); // true
   */
  createEvent(options: { title: string, calendarId?: string, location?: string, startDate?: Date, endDate?: Date, isAllDay?: boolean }): Promise<{ eventCreated: boolean }>;

  /**
   * Retrieves the default reminders list set on the device.
   *
   * @method getDefaultRemindersList
   * @platform iOS
   * @returns {Promise<{ result: Calendar }>} A promise that resolves with the default reminder list set on the device.
   * The returned calendar object contains an ID and a title.
   * @example
   * const { result } = await getDefaultRemindersList();
   * console.log(result); // { id: '1', title: 'Default Reminders List' }
   */
  getDefaultRemindersList(): Promise<{ result: Calendar }>;

  createReminder(options: { title: string }): Promise<{ reminderCreated: boolean }>;
}
