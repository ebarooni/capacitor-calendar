/**
 * @since 8.2.0
 */
export interface UpdateRemindersListOptions {
  /**
   * The new color of the list.
   * If omitted, the color is left unchanged.
   *
   * @example 'indigo'
   * @platform iOS
   * @since 8.1.0
   */
  color?: 'blue' | 'brown' | 'gray' | 'green' | 'indigo' | 'orange' | 'pink' | 'purple' | 'red' | 'teal' | 'yellow';
  /**
   * Whether to save the update to the event store immediately.
   * Pass `false` to batch multiple changes and commit them together using `eventStore.commit()`, which is more efficient than committing each save individually.
   *
   * @default true
   * @platform iOS
   * @since 8.2.0
   */
  commit?: boolean;
  /**
   * The identifier of the list to update.
   *
   * @example 'A1234567-ABCD-EFGH-IJKL-MNOPQRSTUVWX'
   * @platform iOS
   * @since 8.2.0
   */
  id: string;
  /**
   * The new title of the list.
   * If omitted, the title is left unchanged.
   *
   * @example 'Groceries'
   * @platform iOS
   * @since 8.2.0
   */
  title?: string;
}
