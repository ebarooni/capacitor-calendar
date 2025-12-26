import type { RecurrenceRule } from './recurrence-rule';

/**
 * @since 7.1.0
 */
export interface CreateReminderOptions {
  /**
   * @since 7.1.0
   */
  title: string;
  /**
   * @since 7.1.0
   */
  listId?: string;
  /**
   * @since 7.1.0
   */
  priority?: number;
  /**
   * @since 7.1.0
   */
  isCompleted?: boolean;
  /**
   * @since 7.1.0
   */
  startDate?: number;
  /**
   * @since 7.1.0
   */
  dueDate?: number;
  /**
   * @since 7.1.0
   */
  completionDate?: number;
  /**
   * @since 7.1.0
   */
  notes?: string;
  /**
   * @since 7.1.0
   */
  url?: string;
  /**
   * @since 7.1.0
   */
  location?: string;
  /**
   * @since 7.1.0
   */
  recurrence?: RecurrenceRule;
  /**
   * @since 7.1.0
   */
  alerts?: number[];
}
