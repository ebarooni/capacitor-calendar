import type { EventSpan } from '../enums/event-span';

/**
 * @since 7.1.0
 */
export interface DeleteEventsByIdOptions {
  /**
   * Whether to save the deletion to the event store immediately.
   * Pass `false` to batch multiple changes and commit them together using `CapacitorCalendar.commit()`, which is more efficient than committing each save individually.
   *
   * @example false
   * @default true
   * @platform iOS
   * @since 8.3.0
   */
  commit?: boolean;
  /**
   * @since 7.1.0
   */
  ids: string[];
  /**
   * How much of a recurring series to delete.
   * `EventSpan.THIS_EVENT` deletes only the identified event/occurrence.
   * `EventSpan.THIS_AND_FUTURE_EVENTS` deletes this occurrence and subsequent ones.
   * `EventSpan.ALL_EVENTS` deletes the entire series.
   * On Android, occurrence-targeted spans (`THIS_EVENT` / `THIS_AND_FUTURE_EVENTS`) for recurring events are not supported here — use `deleteEvent` or `deleteEventWithPrompt` with `instanceDate`; those ids are reported in `failed`.
   *
   * @example EventSpan.THIS_EVENT
   * @default EventSpan.THIS_EVENT
   * @platform Android, iOS
   * @since 7.1.0
   */
  span?: EventSpan;
}
