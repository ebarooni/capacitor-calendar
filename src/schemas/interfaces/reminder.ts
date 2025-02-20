import type { RecurrenceRule } from "./recurrence-rule";

/**
 * @since 7.1.0
 */
export interface Reminder {
  /**
   * @since 7.1.0
   */
  id: string;
  /**
   * @since 7.1.0
   */
  title: string | null;
  /**
   * @since 7.1.0
   */
  listId: string | null;
  /**
   * @since 7.1.0
   */
  isCompleted: boolean;
  /**
   * @since 7.1.0
   */
  priority: number | null;
  /**
   * @since 7.1.0
   */
  notes: string | null;
  /**
   * @since 7.1.0
   */
  location: string | null;
  /**
   * @since 7.1.0
   */
  url: string | null;
  /**
   * @since 7.1.0
   */
  startDate: number | null;
  /**
   * @since 7.1.0
   */
  dueDate: number | null;
  /**
   * @since 7.1.0
   */
  completionDate: number | null;
  /**
   * @since 7.1.0
   */
  recurrence: RecurrenceRule[];
  /**
   * @since 7.1.0
   */
  alerts: number[];
}
