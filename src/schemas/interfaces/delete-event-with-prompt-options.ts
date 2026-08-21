import type { EventSpan } from '../enums/event-span';

/**
 * @since 7.1.0
 */
export interface DeleteEventWithPromptOptions {
  /**
   * Text to show on the cancel button.
   *
   * @default 'Cancel'
   * @platform Android, iOS
   * @since 7.1.0
   */
  cancelButtonText?: string;
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
   * Text to show on the confirm button.
   *
   * @default 'Delete'
   * @platform Android, iOS
   * @since 7.1.0
   */
  confirmButtonText?: string;
  /**
   * The ID of the event to delete.
   *
   * @example '1234'
   * @platform Android, iOS
   * @since 7.1.0
   */
  id: string;
  /**
   * Start time of the specific occurrence to target, in milliseconds since the epoch.
   * Pass `startDate` from an event returned by `listEventsInRange` when deleting a recurring occurrence with `THIS_EVENT` or `THIS_AND_FUTURE_EVENTS`.
   *
   * @example 1716153600000
   * @platform Android
   * @since 8.3.0
   */
  instanceDate?: number;
  /**
   * Message of the dialog.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  message: string;
  /**
   * How much of a recurring series to delete.
   * `EventSpan.THIS_EVENT` deletes only the identified event/occurrence.
   * `EventSpan.THIS_AND_FUTURE_EVENTS` deletes this occurrence and subsequent ones.
   *
   * @example EventSpan.THIS_EVENT
   * @default EventSpan.THIS_EVENT
   * @platform Android, iOS
   * @since 7.1.0
   */
  span?: EventSpan;
  /**
   * Title of the dialog.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  title: string;
}
