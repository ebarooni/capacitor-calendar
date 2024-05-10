/**
 * Represents a reminder in a reminders list.
 *
 * @interface Reminder
 * @property {string} id The unique identifier of the reminder.
 * @property {string} title The title or name of the reminder. (Optional)
 * @property {string} listId The list that the reminder belongs to. (Optional)
 * @property {boolean} isCompleted Whether the reminder is completed already or not.
 * @property {number} priority The priority of the reminder. (Optional)
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
}
