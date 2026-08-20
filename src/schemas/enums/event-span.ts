/**
 * @since 7.1.0
 */
export enum EventSpan {
  /**
   * Only the identified event or occurrence.
   *
   * @since 7.1.0
   */
  THIS_EVENT,
  /**
   * The identified occurrence and future occurrences in the series.
   *
   * @since 7.1.0
   */
  THIS_AND_FUTURE_EVENTS,
  /**
   * The entire recurring series (all past and future occurrences).
   *
   * @since 8.3.0
   */
  ALL_EVENTS,
}
