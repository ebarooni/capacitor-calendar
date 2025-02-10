import type { Calendar } from "./schemas/interfaces/calendar";
import { CalendarAccess } from "./sub-definitions/calendar-access";
import { CalendarChooserDisplayStyle } from "./schemas/enums/calendar-chooser-display-style";
import { CalendarChooserSelectionStyle } from "./schemas/enums/calendar-chooser-selection-style";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import type { CalendarOperations } from "./sub-definitions/calendar-operations";
import type { CalendarSource } from "./schemas/interfaces/calendar-source";
import { EventOperations } from "./sub-definitions/event-operations";
import { EventSpan } from "./schemas/enums/event-span";
import type { Reminder } from "./schemas/interfaces/reminder";
import type { ReminderRecurrenceRule } from "./schemas/interfaces/reminder-recurrence-rule";
import { RemindersAccess } from "./sub-definitions/reminders-access";
import type { RemindersList } from "./schemas/interfaces/reminders-list";

export interface CapacitorCalendarPlugin
  extends CalendarAccess,
    RemindersAccess,
    EventOperations,
    CalendarOperations {
  /**
   * Presents a prompt to the user to select calendars. This method is available only on iOS.
   *
   * @async
   * @since 0.2.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeCalendar</li>
   * </ul>
   * @param {object} options - Options for customizing the display and selection styles of the calendar chooser.
   * @param {CalendarChooserDisplayStyle} options.displayStyle - To show all or only writeable calendars.
   * @param {CalendarChooserSelectionStyle} [options.selectionStyle] - To be able to select multiple calendars or only one.
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
   * @async
   * @since 0.3.0
   * @platform iOS, Android
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> readCalendar</li>
   *   <li><strong>Android:</strong> readCalendar</li>
   * </ul>
   * @returns {Promise<{ result: Calendar | null }>} A promise that resolves with the default calendar set on the device.
   * The returned calendar object contains an ID and a title. Returns null if there is no default calendar found.
   * @example
   * const { result } = await getDefaultCalendar();
   * console.log(result); // { id: '1', title: 'Default Calendar' }
   */
  getDefaultCalendar(): Promise<{ result: Calendar | null }>;

  /**
   * Retrieves the default reminders list set on the device.
   *
   * @async
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
   * @async
   * @since 0.5.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeReminders</li>
   * </ul>
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
   * @returns {Promise<{ result: string }>} A Promise that resolves with the id of the created reminder
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
   * const { result } = await createReminder(reminderOptions);
   * console.log(result); // 'ID_1'
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
  }): Promise<{ result: string }>;

  /**
   * Opens the calendar app. Since the user leaves your app, use this method with caution.
   * It will open the calendar on today's date if no date is provided.
   *
   * @async
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
   * @async
   * @platform iOS
   * @returns {Promise<void>}
   * @example
   * void CapacitorCalendar.openReminders();
   */
  openReminders(): Promise<void>;

  /**
   * Retrieves the list of calendar events present in the given date range.
   *
   * @async
   * @since 0.10.0
   * @platform iOS, Android
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> readCalendar</li>
   *   <li><strong>Android:</strong> readCalendar</li>
   * </ul>
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
  listEventsInRange(options: {
    startDate: number;
    endDate: number;
  }): Promise<{ result: CalendarEvent[] }>;

  /**
   * Deletes events from the calendar given their IDs.
   *
   * @async
   * @since 0.11.0
   * @platform iOS, Android
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeCalendar</li>
   *   <li><strong>Android:</strong> writeCalendar</li>
   * </ul>
   * @param {object} options Options for defining event IDs.
   * @param {number} options.ids An array of event IDs to be deleted.
   * @returns {Promise<{ deleted: string[], failed: string[] }>}
   * A promise that resolves to an object with two properties:
   *  - deleted: string[] - An array of IDs that were successfully deleted.
   *  - failed: string[] - An array of IDs that could not be deleted.
   * @example
   * const idsToDelete = ['ID_1', 'ID_2', 'ID_DOES_NOT_EXIST'];
   * const { result } = await CapacitorCalendar.deleteEventsById(idsToDelete)
   * console.log(result.deleted)  // ['ID_1', 'ID_2']
   * console.log(result.failed) // ['ID_DOES_NOT_EXIST']
   */
  deleteEventsById(options: {
    ids: string[];
  }): Promise<{ result: { deleted: string[]; failed: string[] } }>;

  /**
   * Creates a calendar
   *
   * @async
   * @since 5.2.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> readCalendar, writeCalendar</li>
   * </ul>
   * @param {object} options Options for creating a calendar.
   * @param {string} options.title The title of the calendar to create.
   * @param {string} options.color The color of the calendar to create.
   * The color should be a HEX string. (Optional)
   * @param {string} options.sourceId The id of the source of the calendar.
   * If not provided, the source of the default calendar will be used. It is
   * recommended to use fetchAllCalendarSources method to fetch the id of the
   * desired source type.
   * @returns {Promise<{ result: string }>} The id of the created calendar.
   * @example
   * { result } = await CapacitorCalendar.createCalendar({
   *      title: 'New Calendar',
   *      color: '#1d00fc',
   *      sourceId: 'local-source-id',
   *  });
   *  console.log(result);   // 'CALENDAR_ID'
   */
  createCalendar(options: {
    title: string;
    color?: string;
    sourceId?: string;
  }): Promise<{ result: string }>;

  /**
   * Deletes a calendar by id
   *
   * @async
   * @since 5.2.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> readCalendar, writeCalendar</li>
   * </ul>
   * @param {object} options Options for deleting a calendar.
   * @param {string} options.id The id of the calendar to delete.
   * @example
   * await CapacitorCalendar.deleteCalendar({ id: 'ID_1' });
   */
  deleteCalendar(options: { id: string }): Promise<void>;

  /**
   * Retrieves the list of reminders present in the given date range.
   *
   * @async
   * @since 5.3.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> readReminders</li>
   * </ul>
   * @param {object} options Options for defining the date range.
   * It Will fetch all reminders from all available lists if not provided. (Optional)
   * @param {string[]} options.listIds An array of reminder list ids.
   * @returns {Promise<{ result: Reminder[] }>} A Promise that resolves with the list of reminders.
   * @example
   * const now = Date.now();
   * const { result } = await CapacitorCalendar.getRemindersFromLists({
   *   listIds: ['LIST_ID_1', 'LIST_ID_2'],
   * });
   */
  getRemindersFromLists(options?: {
    listIds: string[];
  }): Promise<{ result: Reminder[] }>;

  /**
   * Deletes reminders given their IDs.
   *
   * @async
   * @since 5.3.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeReminders</li>
   * </ul>
   * @param {object} options Options for defining reminder IDs.
   * @param {number} options.ids An array of reminder IDs to be deleted.
   * @returns {Promise<{ deleted: string[], failed: string[] }>}
   * A promise that resolves to an object with two properties:
   *  - deleted: string[] - An array of IDs that were successfully deleted.
   *  - failed: string[] - An array of IDs that could not be deleted.
   * @example
   * const idsToDelete = ['ID_1', 'ID_2', 'ID_DOES_NOT_EXIST'];
   * const { result } = await CapacitorCalendar.deleteRemindersById(idsToDelete)
   * console.log(result.deleted)  // ['ID_1', 'ID_2']
   * console.log(result.failed) // ['ID_DOES_NOT_EXIST']
   */
  deleteRemindersById(options: {
    ids: string[];
  }): Promise<{ result: { deleted: string[]; failed: string[] } }>;

  /**
   * Modifies an event given its id and update details.
   *
   * @async
   * @since 6.6.0
   * @platform iOS, Android
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeCalendar, readCalendar</li>
   *   <li><strong>Android:</strong> writeCalendar, readCalendar</li>
   * </ul>
   * @param {Object} options The options for updating an event.
   * @param {string} options.id The id of the event to be modified.
   * @param {EventSpan} options.span The scope of the modifications.
   * Only supported on iOS. (Optional)
   * @param {Object} options.update The set of event properties to be modified.
   * If a property is not supported, it will be ignored. Modifying the reminder of an
   * event is currently not supported on Android.
   * @returns {Promise<void>} A promise that resolves when the update operation is complete.
   * @throws {Error} throws an error if an event for the given id is not found.
   * @example
   * const { result } = await CapacitorCalendar.modifyEvent({
   *   id: 'EVENT_ID_ONE',
   *   span: EventSpan.THIS_SPAN,
   *   update: {
   *     title: 'newTitle',
   *     startDate: Date.now(),
   *   },
   * });
   */
  modifyEvent(options: {
    id: string;
    span?: EventSpan;
    update: {
      title?: string;
      calendarId?: string;
      location?: string;
      startDate?: number;
      endDate?: number;
      isAllDay?: boolean;
      alertOffsetInMinutes?: number | number[];
      url?: string;
      notes?: string;
    };
  }): Promise<void>;

  /**
   * Retrieves a list of calendar sources.
   *
   * @async
   * @since 6.6.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeCalendar, readCalendar</li>
   * </ul>
   * @returns {Promise<{ result: CalendarSource[] }>} A promise that resolves with an array of
   * calendar sources.
   * @example
   * const { result } = await fetchAllCalendarSources();
   * console.log(result); // [{ id: '1', type: '0', title: 'calDav' }, { id: '2', type: '2', title: '3' }]
   */
  fetchAllCalendarSources(): Promise<{ result: CalendarSource[] }>;

  /**
   * Retrieves a list of reminders sources.
   *
   * @async
   * @since 6.6.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeCalendar, readCalendar</li>
   * </ul>
   * @returns {Promise<{ result: CalendarSource[] }>} A promise that resolves with an array of
   * reminders sources.
   * @example
   * const { result } = await fetchAllRemindersSources();
   * console.log(result); // [{ id: '1', type: '0', title: 'calDav' }, { id: '2', type: '2', title: '3' }]
   */
  fetchAllRemindersSources(): Promise<{ result: CalendarSource[] }>;

  /**
   * Modifies a reminder given its id and update details.
   *
   * @async
   * @since 6.7.0
   * @platform iOS
   * @permissions
   * <h3>Runtime Permissions:</h3>
   * <ul>
   *   <li><strong>iOS:</strong> writeReminders, readReminders</li>
   * </ul>
   * @param {Object} options The options for updating a reminder.
   * @param {string} options.id The id of the reminder to be modified.
   * @param {Object} options.update The set of reminder properties to be modified.
   * @returns {Promise<void>} A promise that resolves when the update operation is complete.
   * @throws {Error} throws an error if an event for the given id is not found.
   * @example
   * const { result } = await CapacitorCalendar.reminder({
   *   id: 'REMINDER_ID_ONE',
   *   update: {
   *     title: 'newTitle',
   *     isCompleted: true
   *   },
   * });
   */
  modifyReminder(options: {
    id: string;
    update: {
      title?: string;
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
    };
  }): Promise<void>;
}
