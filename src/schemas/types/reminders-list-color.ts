import type { SystemColorName } from './system-color-name';

/**
 * Color to set on a reminders list: a {@link SystemColorName} or hex `#RRGGBB` / `#RRGGBBAA`.
 *
 * @since 8.8.0
 */
export type RemindersListColor = SystemColorName | `#${string}`;
