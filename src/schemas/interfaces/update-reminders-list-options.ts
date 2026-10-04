import type { SystemColorName } from '../types/system-color-name';

/**
 * @since 7.3.0
 */
export interface UpdateRemindersListOptions {
  /**
   * Named color (`blue`, …) or hex `#RRGGBB` / `#RRGGBBAA`.
   * If omitted, the color is left unchanged.
   *
   * @example 'indigo'
   * @example #007AFF
   * @platform iOS
   * @since 7.3.0
   */
  color?: SystemColorName | `#${string}`;
  /**
   * Whether to save the update immediately.
   * Pass `false` to batch changes and commit them with `CapacitorCalendar.commit()`.
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 7.3.0
   */
  commit?: boolean;
  /**
   * The identifier of the list to update.
   *
   * @example 'A1234567-ABCD-EFGH-IJKL-MNOPQRSTUVWX'
   * @platform iOS
   * @since 7.3.0
   */
  id: string;
  /**
   * The new title of the list.
   * If omitted, the title is left unchanged.
   *
   * @example 'Groceries'
   * @platform iOS
   * @since 7.3.0
   */
  title?: string;
}
