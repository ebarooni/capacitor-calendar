import type { CreateReminderOptions } from '../schemas/interfaces/create-reminder-options';
import type { CreateReminderResult } from '../schemas/interfaces/create-reminder-result';
import type { CreateRemindersListOptions } from '../schemas/interfaces/create-reminders-list-options';
import type { CreateRemindersListResult } from '../schemas/interfaces/create-reminders-list-result';
import type { DeleteReminderOptions } from '../schemas/interfaces/delete-reminder-options';
import type { DeleteReminderWithPromptOptions } from '../schemas/interfaces/delete-reminder-with-prompt-options';
import type { DeleteReminderWithPromptResult } from '../schemas/interfaces/delete-reminder-with-prompt-result';
import type { DeleteRemindersByIdOptions } from '../schemas/interfaces/delete-reminders-by-id-options';
import type { DeleteRemindersByIdResult } from '../schemas/interfaces/delete-reminders-by-id-result';
import type { DeleteRemindersListOptions } from '../schemas/interfaces/delete-reminders-list-options';
import type { FetchAllCalendarSourcesResult } from '../schemas/interfaces/fetch-all-calendar-sources-result';
import type { GetDefaultRemindersListResult } from '../schemas/interfaces/get-default-reminders-list-result';
import type { GetReminderByIdOptions } from '../schemas/interfaces/get-reminder-by-id-options';
import type { GetReminderByIdResult } from '../schemas/interfaces/get-reminder-by-id-result';
import type { GetRemindersFromListsOptions } from '../schemas/interfaces/get-reminders-from-lists-options';
import type { GetRemindersFromListsResult } from '../schemas/interfaces/get-reminders-from-lists-result';
import type { GetRemindersListsResult } from '../schemas/interfaces/get-reminders-lists-result';
import type { ModifyReminderOptions } from '../schemas/interfaces/modify-reminder-options';
import type { UpdateRemindersListOptions } from '../schemas/interfaces/update-reminders-list-options';
import type { UpdateRemindersListResult } from '../schemas/interfaces/update-reminders-list-result';

export interface RemindersOperations {
  /**
   * Creates a new reminders list.
   *
   * Requires reminders access. `title` is required. `color` is optional and
   * defaults to `'blue'` (named or hex). Read-back uses hex `color` and
   * best-effort `colorName`.
   *
   * @throws {Error} `Title must be provided.` — when `title` is missing.
   * @throws {Error} `Invalid color format.` — when `color` is present but invalid.
   *
   * @platform iOS
   * @since 8.1.0
   */
  createRemindersList(options: CreateRemindersListOptions): Promise<CreateRemindersListResult>;
  /**
   * Deletes a reminders list.
   *
   * Requires reminders access.
   *
   * @throws {Error} `List not found.` — when no list exists for `id`.
   *
   * @platform iOS
   * @since 8.2.0
   */
  deleteRemindersList(options: DeleteRemindersListOptions): Promise<void>;
  /**
   * Retrieves a list of calendar sources.
   *
   * @deprecated Duplicates {@link CalendarOperations#fetchAllCalendarSources}
   * @platform iOS
   * @since 6.6.0
   */
  fetchAllRemindersSources(): Promise<FetchAllCalendarSourcesResult>;
  /**
   * Opens the reminders app.
   *
   * @throws {Error} `Failed to launch reminders app.` — when the system cannot open Reminders.
   *
   * @platform iOS
   * @since 7.1.0
   */
  openReminders(): Promise<void>;
  /**
   * Retrieves the default reminders list.
   *
   * Requires reminders access. Without authorization, `result` is typically `null`.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getDefaultRemindersList(): Promise<GetDefaultRemindersListResult>;
  /**
   * Retrieves all available reminders lists.
   *
   * Requires reminders access. Without authorization, `result` is typically an empty array.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getRemindersLists(): Promise<GetRemindersListsResult>;
  /**
   * Creates a reminder.
   *
   * Requires reminders access. `title` is required.
   *
   * @throws {Error} `Title must be provided.` — when `title` is missing.
   * @throws {Error} `List not found.` — when `listId` is set and no list matches.
   * @throws {Error} `Invalid frequency.` — when `recurrence.frequency` is present but invalid.
   * @throws {Error} `Frequency must be provided.` — when recurrence is set without `frequency`.
   * @throws {Error} `Interval must be provided.` — when recurrence is set without `interval`.
   *
   * @platform iOS
   * @since 0.5.0
   */
  createReminder(options: CreateReminderOptions): Promise<CreateReminderResult>;
  /**
   * Deletes multiple reminders.
   *
   * @deprecated Use `deleteReminder(...)`.
   * @platform iOS
   * @since 5.3.0
   */
  deleteRemindersById(options: DeleteRemindersByIdOptions): Promise<{ result: DeleteRemindersByIdResult }>;
  /**
   * Deletes a reminder.
   *
   * Requires reminders access.
   *
   * @throws {Error} `Reminder not found.` — when no reminder exists for `id`.
   *
   * @platform iOS
   * @since 7.1.0
   */
  deleteReminder(options: DeleteReminderOptions): Promise<void>;
  /**
   * Modifies a reminder.
   *
   * Requires reminders access.
   *
   * @throws {Error} `Reminder not found.` — when no reminder exists for `id`.
   * @throws {Error} `List not found.` — when `listId` is set and no list matches.
   * @throws {Error} `Invalid frequency.` — when `recurrence.frequency` is present but invalid.
   * @throws {Error} `Frequency must be provided.` — when recurrence is set without `frequency`.
   * @throws {Error} `Interval must be provided.` — when recurrence is set without `interval`.
   *
   * @platform iOS
   * @since 6.7.0
   */
  modifyReminder(options: ModifyReminderOptions): Promise<void>;
  /**
   * Retrieves a reminder by id.
   *
   * Requires reminders access. Returns `result: null` when no reminder matches.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getReminderById(options: GetReminderByIdOptions): Promise<GetReminderByIdResult>;
  /**
   * Retrieves reminders from multiple lists.
   *
   * Requires reminders access.
   *
   * @throws {Error} `List not found.` — when a requested list id does not exist.
   *
   * @platform iOS
   * @since 5.3.0
   */
  getRemindersFromLists(options: GetRemindersFromListsOptions): Promise<GetRemindersFromListsResult>;
  /**
   * Opens a dialog to delete a reminder.
   *
   * Requires reminders access. On cancel, `deleted` is `false`. On confirm, the
   * reminder is deleted and `deleted` is `true`.
   *
   * @throws {Error} `Reminder not found.` — when no reminder exists for `id`.
   * @throws {Error} `Missing view controller.` — when the plugin cannot present the dialog.
   *
   * @platform iOS
   * @since 7.2.0
   */
  deleteReminderWithPrompt(options: DeleteReminderWithPromptOptions): Promise<DeleteReminderWithPromptResult>;
  /**
   * Updates a reminders list with options.
   *
   * Requires reminders access. `color` accepts a named system color or hex.
   * Read-back uses hex `color` and best-effort `colorName`.
   *
   * @throws {Error} `Event ID must be provided.` — when `id` is missing.
   * @throws {Error} `List not found.` — when no list exists for `id`.
   * @throws {Error} `List is not modifiable.` — when the list does not allow edits.
   * @throws {Error} `Invalid color format.` — when `color` is present but invalid.
   *
   * @platform iOS
   * @since 8.2.0
   */
  updateRemindersList(options: UpdateRemindersListOptions): Promise<UpdateRemindersListResult>;
}
