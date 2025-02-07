export interface EventOperations {
  /**
   * Opens the system calendar interface to create a new event.
   *
   * @example
   * const options = {
   *   title: 'Test event',
   *   startDate: Date.now(),
   *   end
   * }
   * await CapacitorCalendar.createEventWithPrompt(options)
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  createEventWithPrompt(
    options?: CreateEventWithPromptOptions,
  ): Promise<{ id: string | null }>;
}

/**
 * @since 7.1.0
 */
export interface CreateEventWithPromptOptions {
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  title?: string;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  calendarId?: string;
  /**
   * TODO: Check Android
   * @platform iOS
   * @since 0.1.0
   */
  location?: string;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  startDate?: number;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  endDate?: number;
  /**
   * @platform Android, iOS
   * @since 0.1.0
   */
  isAllDay?: boolean;
  /**
   * Sets alerts before the start of the event in minutes.
   * On iOS only 2 alerts are supported.
   *
   * @example
   * // 10mins before and 30mins after the event
   * const alerts: [-10, 30]
   *
   * TODO: Check Android
   * @platform iOS
   * @since 7.1.0
   */
  alerts?: number[];
  /**
   * TODO: Check Android
   * @platform iOS
   * @since 0.1.0
   */
  url?: string;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  description?: string;
  /**
   * Set to `true` to get the ID of the created event. Default value is `false`.
   * Only needed on Android. Ignored on iOS.
   *
   * @permissions
   * | Platform  | scope |
   * |-----------|---------------------|
   * | Android   | `readCalendar` |
   * @platform Android
   * @since 7.1.0
   */
  lookupId?: boolean;
}
