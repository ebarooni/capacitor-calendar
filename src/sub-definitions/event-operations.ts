import type { CalendarEvent } from "../schemas/interfaces/calendar-event";
import type { CreateEventOptions } from "../schemas/interfaces/create-event-options";
import type { CreateEventWithPromptOptions } from "../schemas/interfaces/create-event-with-prompt-options";
import type { DeleteEventOptions } from "../schemas/interfaces/delete-event-options";
import type { DeleteEventWithPromptOptions } from "../schemas/interfaces/delete-event-with-prompt-options";
import type { DeleteEventsByIdOptions } from "../schemas/interfaces/delete-events-by-id-options";
import type { EventEditAction } from "../schemas/types/event-edit-action";
import type { ListEventsInRangeOptions } from "../schemas/interfaces/list-events-in-range-options";
import type { ModifyEventOptions } from "../schemas/interfaces/modify-event-options";
import type { ModifyEventWithPromptOptions } from "../schemas/interfaces/modify-event-with-prompt-options";

export interface EventOperations {
  /**
   * Opens the system calendar interface to create a new event.
   * On Android always returns `null`.
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
  createEventWithPrompt(
    options?: CreateEventWithPromptOptions,
  ): Promise<{ id: string | null }>;
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
  modifyEventWithPrompt(
    options: ModifyEventWithPromptOptions,
  ): Promise<{ result: EventEditAction | null }>;
  /**
   * Creates an event in the calendar.
   *
   * @platform iOS, Android
   * @since 0.4.0
   */
  createEvent(options: CreateEventOptions): Promise<{ id: string }>;
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
  deleteEventsById(
    options: DeleteEventsByIdOptions,
  ): Promise<{ result: DeleteEventsByIdResult }>;
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
  deleteEventWithPrompt(
    options: DeleteEventWithPromptOptions,
  ): Promise<{ deleted: boolean }>;
  /**
   * Retrieves the events within a date range.
   *
   * @platform Android, iOS
   * @since 0.10.0
   */
  listEventsInRange(
    options: ListEventsInRangeOptions,
  ): Promise<{ result: CalendarEvent[] }>;
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
