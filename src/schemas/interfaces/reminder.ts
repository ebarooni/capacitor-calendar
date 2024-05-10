import { ReminderRecurrenceRule } from './reminder-recurrence-rule';

/**
 * Represents a reminder in a reminders list.
 *
 * @interface Reminder
 * @property {string} id The unique identifier of the reminder.
 * @property {string} title The title or name of the reminder. (Optional)
 * @property {string} listId The list that the reminder belongs to. (Optional)
 * @property {boolean} isCompleted Whether the reminder is completed already or not.
 * @property {number} priority The priority of the reminder. (Optional)
 * @property {string} notes The notes of the reminder. (Optional)
 * @property {string} url The url of the reminder. (Optional)
 * @property {number} startDate The start date of the reminder. (Optional)
 * @property {number} dueDate The due date of the reminder. (Optional)
 * @property {number} completionDate The completion date of the reminder. (Optional)
 * @property {ReminderRecurrenceRule[]} recurrence The recurrence rules of the reminder. (Optional)
 */
export interface Reminder {
  /**
   * @platform iOS
   */
  id: string;

  /**
   * @platform iOS
   */
  title?: string;

  /**
   * @platform iOS
   */
  listId?: string;

  /**
   * @platform iOS
   */
  isCompleted?: boolean;

  /**
   * @platform iOS
   */
  priority?: number;

  /**
   * @platform iOS
   */
  notes?: string;

  /**
   * @platform iOS
   */
  location?: string;

  /**
   * @platform iOS
   */
  url?: string;

  /**
   * @platform iOS
   */
  startDate?: number;

  /**
   * @platform iOS
   */
  dueDate?: number;

  /**
   * @platform iOS
   */
  completionDate?: number;

  /**
   * @platform iOS
   */
  recurrence?: ReminderRecurrenceRule[];
}
