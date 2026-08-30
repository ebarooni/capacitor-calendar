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
   * The color of the calendar as `#RRGGBB` or `#RRGGBBAA`.
   *
   * When omitted, Android and iOS use `#007AFF` (light-mode iOS system blue).
   *
   * @platform Android, iOS
   * @example #007AFF
   * @default #007AFF
   * @since 5.2.0
   */
  color?: string;
  /**
   * The EventKit source (account) where the calendar should be created.
   *
   * If provided, it must match an existing source from `fetchAllCalendarSources()`.
   * If omitted, iCloud is used when available, otherwise the local source.
   *
   * @platform iOS
   * @since 5.2.0
   */
  sourceId?: string;
  /**
   * The account under which the calendar is registered.
   * Required on Android. Typically an email address.
   *
   * @example plugin@example.com
   * @platform Android
   * @since 7.1.0
   */
  accountName?: string;
  /**
   * The owner of the calendar.
   * Required on Android. Typically an email address.
   *
   * @example plugin@example.com
   * @platform Android
   * @since 7.1.0
   */
  ownerAccount?: string;
}
