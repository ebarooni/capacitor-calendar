/**
 * @since 5.2.0
 */
export interface CreateCalendarOptions {
  /**
   * @platform Android, iOS
   * @since 5.2.0
   */
  title: string;
  /**
   * The color of the calendar.
   * Should be provided on Android.
   *
   * @platform Android, iOS
   * @example #0000FF
   * @since 5.2.0
   */
  color?: string;
  /**
   * @platform iOS
   * @since 5.2.0
   */
  sourceId?: string;
  /**
   * Only needed on Android. Typically set to an email address.
   *
   * @platform Android
   * @since 7.1.0
   */
  accountName?: string;
  /**
   * Only needed on Android. Typically set to an email address.
   *
   * @platform Android
   * @since 7.1.0
   */
  ownerAccount?: string;
}
