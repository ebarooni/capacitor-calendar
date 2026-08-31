import type { CalendarEvent } from '../schemas/interfaces/calendar-event';
import type { CreateEventOptions } from '../schemas/interfaces/create-event-options';
import type { CreateEventResult } from '../schemas/interfaces/create-event-result';
import type { CreateEventWithPromptOptions } from '../schemas/interfaces/create-event-with-prompt-options';
import type { CreateEventWithPromptResult } from '../schemas/interfaces/create-event-with-prompt-result';
import type { DeleteEventOptions } from '../schemas/interfaces/delete-event-options';
import type { DeleteEventWithPromptOptions } from '../schemas/interfaces/delete-event-with-prompt-options';
import type { DeleteEventsByIdOptions } from '../schemas/interfaces/delete-events-by-id-options';
import type { ListEventsInRangeOptions } from '../schemas/interfaces/list-events-in-range-options';
import type { ModifyEventOptions } from '../schemas/interfaces/modify-event-options';
import type { ModifyEventWithPromptOptions } from '../schemas/interfaces/modify-event-with-prompt-options';
import type { EventEditAction } from '../schemas/types/event-edit-action';

export interface EventOperations {
  /**
   * Opens the system calendar interface to create a new event.
   * On Android always returns `null` for `id`.
   * Fetch the events to find the ID of the newly created event.
   *
   * @example
   * const options = {
   *   title: 'Test event',
   *   startDate: Date.now(),
   * }
   * await CapacitorCalendar.createEventWithPrompt(options)
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  createEventWithPrompt(options?: CreateEventWithPromptOptions): Promise<CreateEventWithPromptResult>;
  /**
   * Opens a system calendar interface to modify an event.
   * On Android always returns `null`.
   *
   * @example
   * const options = {
   *   id: 'EVENT_ID',
   *   title: 'New title',
   * }
   * await CapacitorCalendar.modifyEventWithPrompt(options);
   *
   * @platform Android, iOS
   * @since 6.6.0
   */
  modifyEventWithPrompt(options: ModifyEventWithPromptOptions): Promise<{ result: EventEditAction | null }>;
  /**
   * Creates an event in the calendar.
   * On Android and iOS, inserts into the system calendar and returns its `id`.
   * On Web, there is no system calendar store: builds an `.ics` `File` as `ics`.
   * The app must download or open that file (for example with `downloadIcsFile(...)`);
   * this method does not trigger a download.
   *
   * @example
   * const { id, ics } = await CapacitorCalendar.createEvent({
   *   title: 'Team standup',
   *   startDate: Date.now(),
   *   icsFileName: 'team-standup.ics',
   * });
   * if (ics) {
   *   downloadIcsFile(ics);
   * }
   *
   * @platform Android, iOS, Web
   * @since 0.4.0
   */
  createEvent(options: CreateEventOptions): Promise<CreateEventResult>;
  /**
   * Modifies an event.
   *
   * @platform Android, iOS
   * @since 6.6.0
   */
  modifyEvent(options: ModifyEventOptions): Promise<void>;
  /**
   * Deletes multiple events.
   *
   * @deprecated Use `deleteEvent(...)`.
   * @platform Android, iOS
   * @since 0.11.0
   */
  deleteEventsById(options: DeleteEventsByIdOptions): Promise<{ result: DeleteEventsByIdResult }>;
  /**
   * Deletes an event.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  deleteEvent(options: DeleteEventOptions): Promise<void>;
  /**
   * Opens a dialog to delete an event.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  deleteEventWithPrompt(options: DeleteEventWithPromptOptions): Promise<{ deleted: boolean }>;
  /**
   * Retrieves events that overlap a date range.
   *
   * An event is included when its time interval intersects `[from, to]`, including
   * multi-day events that span the range without starting or ending inside it.
   *
   * @example
   * const startOfDay = new Date();
   * startOfDay.setHours(0, 0, 0, 0);
   * const startOfNextDay = new Date(startOfDay);
   * startOfNextDay.setDate(startOfNextDay.getDate() + 1);
   *
   * const { result } = await CapacitorCalendar.listEventsInRange({
   *   from: startOfDay.getTime(),
   *   to: startOfNextDay.getTime(),
   * });
   *
   * @platform Android, iOS
   * @since 0.10.0
   */
  listEventsInRange(options: ListEventsInRangeOptions): Promise<{ result: CalendarEvent[] }>;
}

/**
 * @since 7.1.0
 */
export interface DeleteEventsByIdResult {
  /**
   * @since 7.1.0
   */
  deleted: string[];
  /**
   * @since 7.1.0
   */
  failed: string[];
}
