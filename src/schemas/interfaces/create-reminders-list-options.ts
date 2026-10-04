import type { SystemColorName } from '../types/system-color-name';

/**
 * @since 7.3.0
 */
export interface CreateRemindersListOptions {
  /**
   * Named color (`blue`, …) or hex `#RRGGBB` / `#RRGGBBAA`.
   * When omitted, the platform chooses the list color.
   *
   * @example 'indigo'
   * @example #007AFF
   * @platform iOS
   * @since 7.3.0
   */
  color?: SystemColorName | `#${string}`;
  /**
   * Whether to save the list immediately.
   * Pass `false` to batch changes and commit them with `CapacitorCalendar.commit()`.
   *
   * @example false
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 7.3.0
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
   * @since 7.3.0
   */
  sourceId?: string;
  /**
   * The title of the list.
   *
   * @example 'Groceries'
   * @platform iOS
   * @since 7.3.0
   */
  title: string;
}
