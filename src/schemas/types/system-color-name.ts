/**
 * Named iOS system color.
 *
 * @since 8.8.0
 */
export type SystemColorName =
  | 'blue'
  | 'brown'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow';

/**
 * Color to set on a reminders list: a {@link SystemColorName} or hex `#RRGGBB` / `#RRGGBBAA`.
 *
 * @since 8.8.0
 */
export type RemindersListColor = SystemColorName | `#${string}`;
