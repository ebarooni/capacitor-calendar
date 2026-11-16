import type { CalendarEvent } from './calendar-event';

/**
 * Sent to `calendarChanged` listeners. Only fields that have a change are present.
 *
 * @since 8.12.0
 */
export interface CalendarChangedEvent {
  /**
   * Events that are new in the watched window.
   * Not present when `includeEvents` is `false`.
   *
   * @since 8.12.0
   */
  created?: CalendarEvent[];
  /**
   * Events in the watched window that changed.
   * Not present when `includeEvents` is `false`.
   *
   * @since 8.12.0
   */
  updated?: CalendarEvent[];
  /**
   * Ids of events that were deleted or left the watched window.
   *
   * @since 8.12.0
   */
  deletedIds?: string[];
  /**
   * `true` when a calendar was added, removed or edited.
   *
   * @since 8.12.0
   */
  calendarsChanged?: boolean;
  /**
   * `true` when reminders probably changed. This is a signal only. No reminders are sent.
   * Best effort. It is set only when `includeReminders` is `true`, reminders access is granted and no event or calendar change was found.
   * It is never set on Android.
   *
   * @platform iOS
   * @since 8.12.0
   */
  remindersChanged?: boolean;
  /**
   * `true` when the lists above are complete for the watched window.
   * `false` when something changed but the change could not be found.
   * Then read the data again with `listEventsInRange`.
   *
   * @since 8.12.0
   */
  precise: boolean;
}
