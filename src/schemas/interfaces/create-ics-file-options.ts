/**
 * @since 8.12.0
 */
export interface CreateIcsFileOptions {
  /**
   * File name. When omitted, the name comes from the first event (`icsFileName` or `title`).
   * `.ics` is appended when missing.
   *
   * @since 8.12.0
   */
  fileName?: string;
  /**
   * `PUBLISH` adds or updates events. `CANCEL` tells calendar apps to remove events that have the same `uid`.
   * For `CANCEL`, set the same `uid` as in the file you made before.
   *
   * @default 'PUBLISH'
   * @since 8.12.0
   */
  method?: 'PUBLISH' | 'CANCEL';
}
