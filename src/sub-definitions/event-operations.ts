import type { CreateEventOptions } from "../schemas/interfaces/create-event-options";
import type { CreateEventWithPromptOptions } from "../schemas/interfaces/create-event-with-prompt-options";
import type { EventEditAction } from "../schemas/types/event-edit-action";
import type { ModifyEventWithPromptOptions } from "../schemas/interfaces/modify-event-with-prompt-options";

export interface EventOperations {
  /**
   * Opens the system calendar interface to create a new event.
   * On Android always return `null`.
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
}
