/**
 * @since 8.2.0
 */
export interface UpdateRemindersListOptions {
  /**
   * Named system color for the list.
   * If omitted or unrecognized, the color is left unchanged.
   * List getters return the color as hex.
   *
   * @example 'indigo'
   * @platform iOS
   * @since 8.2.0
   */
  color?: 'blue' | 'brown' | 'gray' | 'green' | 'indigo' | 'orange' | 'pink' | 'purple' | 'red' | 'teal' | 'yellow';
  /**
   * Whether to save the update immediately.
   * Pass `false` to batch changes and commit them with `CapacitorCalendar.commit()`.
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
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
