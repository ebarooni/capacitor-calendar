import type { SystemColorName } from './system-color-name';

/**
 * Named system color or hex `#RRGGBB` / `#RRGGBBAA`.
 *
 * @since 8.8.0
 */
export type SystemOrHexColor = SystemColorName | `#${string}`;
