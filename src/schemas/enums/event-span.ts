/**
 * Enum representing the span of modifications.
 *
 * @enum EventSpan
 * @platform iOS
 */
export enum EventSpan {
  /**
   * The modifications should only be applied to this event.
   */
  THIS_EVENT,

  /**
   * The modifications to this event should also be applied to the future instances of this event.
   */
  THIS_AND_FUTURE_EVENTS,
}
