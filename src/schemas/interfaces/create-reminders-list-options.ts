import type { RemindersListColor } from '../types/system-color-name';

/**
 * @since 8.1.0
 */
export interface CreateRemindersListOptions {
  /**
   * Named system color or hex `#RRGGBB` / `#RRGGBBAA`.
   * Read-back uses hex `color` and best-effort `colorName` (no nearest-name mapping).
   *
   * @example 'indigo'
   * @example #007AFF
   * @default 'blue'
   * @platform iOS
   * @since 8.1.0
   */
  color?: RemindersListColor;
  /**
   * Whether to save the list immediately.
   * Pass `false` to batch changes and commit them with `CapacitorCalendar.commit()`.
   *
   * @example false
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 8.1.0
   */
  commit?: boolean;
  /**
   * The calendar source (account) where the list should be created.
   *
   * If provided, it should match a source from `fetchAllCalendarSources()`.
   * If omitted or unmatched, iCloud is used when available, otherwise the local source.
   *
   * @example 'A1234567-ABCD-EFGH-IJKL-MNOPQRSTUVWX'
   * @platform iOS
   * @since 8.1.0
   */
  sourceId?: string;
  /**
   * The title of the list.
   *
   * @example 'Groceries'
   * @platform iOS
   * @since 8.1.0
   */
  title: string;
}
