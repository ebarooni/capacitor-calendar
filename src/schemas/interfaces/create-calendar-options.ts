import type { SystemColorName } from '../types/system-color-name';

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
   * Named color (`blue`, …) or hex `#RRGGBB` / `#RRGGBBAA`.
   * When omitted, Android and iOS use `#007AFF`.
   * On Android, only hex is accepted; named colors reject with `Invalid color format.`
   *
   * @platform Android, iOS
   * @example 'indigo'
   * @example #007AFF
   * @default #007AFF
   * @since 5.2.0
   */
  color?: SystemColorName | `#${string}`;
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
