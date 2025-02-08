export interface EventOperations {
  /**
   * Opens the system calendar interface to create a new event.
   * On Android returns always `null`.
   * Fetch the events to find the ID of the newly created event.
   *
   * @example
   * const options = {
   *   title: 'Test event',
   *   startDate: Date.now(),
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
   * @platform iOS
   * @since 0.1.0
   */
  calendarId?: string;
  /**
   * @platform Android, iOS
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
   * @platform iOS
   * @since 7.1.0
   */
  alerts?: number[];
  /**
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
   * TODO: Implement on iOS
   * @platform Android, iOS
   * @see 7.1.0
   */
  availability?: EventAvailability;
  /**
   * An array of emails to invite.
   *
   * @platform Android
   * @since 7.1.0
   */
  invitees?: string[];
}

/**
 * @since 7.1.0
 */
export enum EventAvailability {
  /**
   * @platform iOS
   * @since 7.1.0
   */
  NOT_SUPPORTED = -1,
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  BUSY,
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  FREE,
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  TENTATIVE,
  /**
   * @platform iOS
   * @since 7.1.0
   */
  UNAVAILABLE,
}
