import type { SystemOrHexColor } from '../types/system-or-hex-color';

/**
 * @since 8.2.0
 */
export interface UpdateRemindersListOptions {
  /**
   * Named color (`blue`, …) or hex `#RRGGBB` / `#RRGGBBAA`.
   * If omitted, the color is left unchanged.
   *
   * @example 'indigo'
   * @example #007AFF
   * @platform iOS
   * @since 8.2.0
   */
  color?: SystemOrHexColor;
  /**
   * Whether to save the update immediately.
   * Pass `false` to batch changes and commit them with `CapacitorCalendar.commit()`.
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 8.2.0
   */
  commit?: boolean;
  /**
   * The identifier of the list to update.
   *
   * @example 'A1234567-ABCD-EFGH-IJKL-MNOPQRSTUVWX'
   * @platform iOS
   * @since 8.2.0
   */
  id: string;
  /**
   * The new title of the list.
   * If omitted, the title is left unchanged.
   *
   * @example 'Groceries'
   * @platform iOS
   * @since 8.2.0
   */
  title?: string;
}
