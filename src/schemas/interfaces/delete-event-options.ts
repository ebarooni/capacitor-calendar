import type { EventSpan } from '../enums/event-span';

/**
 * @since 7.1.0
 */
export interface DeleteEventOptions {
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
   * The ID of the event to delete.
   *
   * @example '1234'
   * @platform Android, iOS
   * @since 7.1.0
   */
  id: string;
  /**
   * The start time of the occurrence to delete, in milliseconds since the epoch.
   * Use `startDate` from `listEventsInRange`.
   * On Android, required for `THIS_EVENT` on recurring events. If omitted with `THIS_AND_FUTURE_EVENTS`, the whole series is deleted.
   *
   * @example 1716153600000
   * @platform Android
   * @since 8.3.0
   */
  instanceDate?: number;
  /**
   * How much of a recurring series to delete.
   *
   * @example EventSpan.THIS_EVENT
   * @default EventSpan.THIS_EVENT
   * @platform Android, iOS
   * @since 7.1.0
   */
  span?: EventSpan;
}
