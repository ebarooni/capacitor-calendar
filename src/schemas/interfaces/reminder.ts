/**
 * Represents a reminder in a reminders list.
 *
 * @interface Reminder
 * @property {string} id The unique identifier of the reminder.
 * @property {string} title The title or name of the reminder. (Optional)
 * @property {string} listId The list that the reminder belongs to. (Optional)
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
}
