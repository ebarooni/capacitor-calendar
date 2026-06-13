/**
 * @since 8.2.0
 */
export interface DeleteRemindersListOptions {
  /**
   * Whether to save the changes to the event store immediately.
   * Pass `false` to batch multiple changes and commit them together using `CapacitorCalendar.commit()`, which is more efficient than committing each save individually.
   *
   * @example false
   * @default true
   * @platform iOS
   * @since 8.2.0
   */
  commit?: boolean;
  /**
   * Identifier of the reminders list to delete.
   *
   * @example 'A1234567-ABCD-EFGH-IJKL-MNOPQRSTUVWX'
   * @platform iOS
   * @since 8.2.0
   */
  id: string;
}
