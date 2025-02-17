import { CalendarAccess } from "./sub-definitions/calendar-access";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import type { CalendarOperations } from "./sub-definitions/calendar-operations";
import { EventOperations } from "./sub-definitions/event-operations";
import type { Reminder } from "./schemas/interfaces/reminder";
import type { ReminderRecurrenceRule } from "./schemas/interfaces/reminder-recurrence-rule";
import { RemindersAccess } from "./sub-definitions/reminders-access";
import type { RemindersOperations } from "./sub-definitions/reminders-operations";

export interface CapacitorCalendarPlugin
  extends CalendarAccess,
    RemindersAccess,
    EventOperations,
    CalendarOperations,
    RemindersOperations {
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
