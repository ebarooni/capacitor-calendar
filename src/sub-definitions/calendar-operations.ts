export interface CalendarOperations {
  /**
   * TODO: Throw unimplemented error on Android
   * Save the changes to the calendar.
   *
   * @platform iOS
   * @since 7.1.0
   */
  commit(): Promise<void>;
}
