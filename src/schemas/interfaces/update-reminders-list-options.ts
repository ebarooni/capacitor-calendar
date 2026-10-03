import type { RemindersListColor } from '../types/system-color-name';

/**
 * @since 8.2.0
 */
export interface UpdateRemindersListOptions {
  /**
   * Named color (`blue`, …) or hex `#RRGGBB` / `#RRGGBBAA`.
   * If omitted, the color is left unchanged.
   * When you read the list, `color` is hex (or null). `colorName` is a named
   * color if this plugin recognizes the stored color; otherwise null.
   *
   * @example 'indigo'
   * @example #007AFF
   * @platform iOS
   * @since 8.2.0
   */
  color?: RemindersListColor;
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
