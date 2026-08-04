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
   * @since 7.1.0
   */
  id: string;
  /**
   * The span of deletion.
   *
   * @default EventSpan.THIS_EVENT
   * @platform Android, iOS
   * @since 7.1.0
   */
  span?: EventSpan;
}
