import { CalendarChooserDisplayStyle } from './schemas/enums/calendar-chooser-display-style';
import { CalendarChooserSelectionStyle } from './schemas/enums/calendar-chooser-selection-style';
import { PluginPermission } from './schemas/enums/plugin-permission';
import type { PermissionState } from '@capacitor/core';
import type { Calendar } from './schemas/interfaces/calendar';
import type { RemindersList } from './schemas/interfaces/reminders-list';
import type { PluginPermissionsMap } from './schemas/interfaces/plugin-permissions-map';
import type { ReminderRecurrenceRule } from './schemas/interfaces/reminder-recurrence-rule';
import type { CalendarEvent } from './schemas/interfaces/calendar-event';

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
  checkPermission(options: { alias: PluginPermission }): Promise<{ result: PermissionState }>;

  /**
   * Checks the current authorization status of all the required permissions for the plugin.
   *
   * @method
   * @platform iOS, Android
   * @returns {Promise&lt;PluginPermissionsMap&gt;} – A promise that resolves with an object containing all the permissions and their status.
   * @example
   * const permissionsStatus = await this.checkAllPermissions();
   */
  checkAllPermissions(): Promise<PluginPermissionsMap>;

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
  requestPermission(options: { alias: PluginPermission }): Promise<{ result: PermissionState }>;

  /**
   * Requests authorization to all the required permissions for the plugin, if they have not already been granted.
   *
   * @method
   * @platform iOS, Android
   * @returns {Promise&lt;PluginPermissionsMap&gt;} – A promise that resolves with the new permission statuses after the request is made.
   * @example
   * const permissionResults = await this.requestAllPermissions();
   */
  requestAllPermissions(): Promise<PluginPermissionsMap>;

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
    displayStyle: CalendarChooserDisplayStyle;
    selectionStyle: CalendarChooserSelectionStyle;
  }): Promise<{ result: Calendar[] }>;

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
   * @param {number} [options.startDate] - The start date and time of the event. (Optional)
   * @param {number} [options.endDate] - The end date and time of the event. (Optional)
   * @param {boolean} [options.isAllDay] - Weather the event is for the entire day or not. (Optional)
   * @returns {Promise<{ eventCreated: boolean }>} A Promise that resolves with an object indicating whether the event was created successfully.
   * The resolved object has a property 'eventCreated' which is a boolean value representing whether the event was created.
   * @example
   * const now = Date.now();
   * const eventOptions = {
   *   title: 'Team Meeting',
   *   location: 'Conference Room A',
   *   startDate: now,
   *   endDate: now + 2 * 60 * 60 * 1000,
   *   isAllDay: false
   * };
   * const { eventCreated } = await createEvent(eventOptions);
   * console.log(eventCreated); // true
   */
  createEvent(options: {
    title: string;
    calendarId?: string;
    location?: string;
    startDate?: number;
    endDate?: number;
    isAllDay?: boolean;
  }): Promise<{ eventCreated: boolean }>;

  /**
   * Retrieves the default reminders list set on the device.
   *
   * @method getDefaultRemindersList
   * @platform iOS
   * @returns {Promise<{ result: RemindersList }>} A promise that resolves with the default reminder list set on the device.
   * The returned reminders list object contains an ID and a title.
   * @example
   * const { result } = await getDefaultRemindersList();
   * console.log(result); // { id: '1', title: 'Default Reminders List' }
   */
  getDefaultRemindersList(): Promise<{ result: RemindersList }>;

  /**
   * Retrieves all available reminders lists on the device.
   *
   * @async
   * @method getRemindersLists
   * @platform iOS
   * @returns {Promise<{ result: RemindersList[] }>} A promise that resolves with an array of reminders lists available on the device.
   * Each reminders list object in the array contains an ID and a title.
   * @example
   * const { result } = await getRemindersLists();
   * console.log(result); // [{ id: '1', title: 'Groceries' }, { id: '2', title: 'Subscriptions' }]
   */
  getRemindersLists(): Promise<{ result: RemindersList[] }>;

  /**
   * Creates a reminder with the provided options.
   *
   * @method createReminder
   * @platform iOS
   * @param {object} options - Options for creating the reminder.
   * @param {string} options.title - The title of the reminder.
   * @param {string} options.listId - The id of the destination reminders list. (Optional)
   * @param {number} [options.priority] - The priority of the reminder. A number between one and nine where nine
   * has the least priority and 0 means no priority at all. Values outside of this range will be rounded to the
   * nearest border. (Optional)
   * @param {boolean} [options.isCompleted] - Whether the reminder is completed already or not. (Optional)
   * @param {number} [options.startDate] - The start date of the reminder. (Optional)
   * @param {number} [options.dueDate] - The due date of the reminder. (Optional)
   * @param {number} [options.completionDate] - The date at which the reminder was completed. (Optional)
   * @param {string} [options.notes] - Additional notes about the reminder. (Optional)
   * @param {string} [options.url] - A URL to save under the reminder. (Optional)
   * @param {string} [options.location] - A location to save under the reminder. (Optional)
   * @param {string} [options.recurrence] - The rules for the recurrence of the reminder. (Optional)
   * @returns {Promise<{ reminderCreated: boolean }>} A Promise that resolves with an object indicating whether the reminder was created successfully.
   * The resolved object has a property 'reminderCreated' which is a boolean value representing whether the reminder was created.
   * @example
   * const now = Date.now();
   * const rules: ReminderRecurrenceRule = {
   *     frequency: ReminderRecurrenceFrequency.MONTHLY,
   *     interval: 10,
   *     end: Date.now()
   * }
   * const reminderOptions = {
   *   title: 'Buy cucumber',
   *   listId: 'ABC12',
   *   priority: 5,
   *   isCompleted: false,
   *   startDateComponents: now,
   *   notes: 'Also buy tomatoes',
   *   url: 'https://capacitor-calendar.pages.dev/',
   *   location: 'My Local Supermarket',
   *   recurrence: rules
   * };
   * const { reminderCreated } = await createReminder(reminderOptions);
   * console.log(reminderCreated); // true
   */
  createReminder(options: {
    title: string;
    listId?: string;
    priority?: number;
    isCompleted?: boolean;
    startDate?: number;
    dueDate?: number;
    completionDate?: number;
    notes?: string;
    url?: string;
    location?: string;
    recurrence?: ReminderRecurrenceRule;
  }): Promise<{ reminderCreated: boolean }>;

  /**
   * Opens the calendar app. Since the user leaves your app, use this method with caution.
   * It will open the calendar on today's date if no date is provided.
   *
   * @method openCalendar
   * @platform iOS, Android
   * @param {object} options - Options for opening the calendar.
   * @param {number} options.date - The date at which the calendar should be opened. (Optional)
   * @returns {Promise<void>}
   * @example
   * void CapacitorCalendar.openCalendar({ date: Date.now() });
   */
  openCalendar(options: { date?: number }): Promise<void>;

  /**
   * Opens the reminders app. Since the user leaves your app, use this method with caution.
   *
   * @method openReminders
   * @platform iOS
   * @returns {Promise<void>}
   * @example
   * void CapacitorCalendar.openReminders();
   */
  openReminders(): Promise<void>;

  /**
   * Retrieves the list of calendar events present in the given date range.
   *
   * @method listEventsInRange
   * @platform iOS, Android
   * @param {object} options Options for defining the date range.
   * @param {number} options.startDate The start of the date range.
   * @param {number} options.endDate The end of the date range.
   * @returns {Promise<{ result: CalendarEvent[] }>} A Promise that resolves with the list of events.
   * @example
   * const { result } = await CapacitorCalendar.listEventsInRange({
   *   startDate: Date.now(),
   *   endDate: Date.now() + 6 * 7 * 24 * 60 * 60 * 1000, // 6 weeks from now
   * })
   */
  listEventsInRange(options: { startDate: number; endDate: number }): Promise<{ result: CalendarEvent[] }>;
}
