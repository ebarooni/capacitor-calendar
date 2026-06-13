/**
 * @platform iOS
 * @since 8.1.0
 */
export interface CreateRemindersListOptions {
  /**
   * The color of the list.
   *
   * @example 'indigo'
   * @default 'blue'
   * @platform iOS
   * @since 8.1.0
   */
  color?: 'blue' | 'brown' | 'gray' | 'green' | 'indigo' | 'orange' | 'pink' | 'purple' | 'red' | 'teal' | 'yellow';
  /**
   * The EKSource identifier (account) where the list should be created.
   * If left undefined, iCloud will be used if available, otherwise falls back to local.
   *
   * @example 'A1234567-ABCD-EFGH-IJKL-MNOPQRSTUVWX'
   * @platform iOS
   * @since 8.1.0
   */
  sourceId?: string;
  /**
   * The title of the list.
   *
   * @example 'Groceries'
   * @platform iOS
   * @since 8.1.0
   */
  title: string;
}
