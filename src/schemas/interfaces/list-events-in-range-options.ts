/**
 * @since 7.1.0
 */
export interface ListEventsInRangeOptions {
  /**
   * The start of the range, in milliseconds since the epoch.
   * Events still in progress at this time are included.
   *
   * @example 1719792000000
   * @since 7.1.0
   */
  from: number;
  /**
   * The end of the range, in milliseconds since the epoch.
   * Events that begin at or after this time are typically excluded; prefer the
   * next day's start when querying a single calendar day.
   *
   * @example 1719878400000
   * @since 7.1.0
   */
  to: number;
}
