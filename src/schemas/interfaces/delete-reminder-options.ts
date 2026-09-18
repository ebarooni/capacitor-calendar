/**
 * @since 7.1.0
 */
export interface DeleteReminderOptions {
  /**
   * Whether to save immediately (`true`) or batch changes for later (`false`).
   * Pass `false` to batch multiple changes and commit them together using `CapacitorCalendar.commit()`, which is more efficient than committing each save individually.
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 8.7.0
   */
  commit?: boolean;
  /**
   * @since 7.1.0
   */
  id: string;
}
