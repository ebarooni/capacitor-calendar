import type { CalendarSource } from "../schemas/interfaces/calendar-source";
import type { CreateReminderOptions } from "../schemas/interfaces/create-reminder-options";
import type { DeleteReminderOptions } from "../schemas/interfaces/delete-reminder-options";
import type { DeleteReminderWithPromptOptions } from "../schemas/interfaces/delete-reminder-with-prompt-options";
import type { DeleteRemindersByIdOptions } from "../schemas/interfaces/delete-reminders-by-id-options";
import type { GetReminderByIdOptions } from "../schemas/interfaces/get-reminder-by-id-options";
import type { GetRemindersFromListsOptions } from "../schemas/interfaces/get-reminders-from-lists-options";
import type { ModifyReminderOptions } from "../schemas/interfaces/modify-reminder-options";
import type { Reminder } from "../schemas/interfaces/reminder";
import type { RemindersList } from "../schemas/interfaces/reminders-list";

export interface RemindersOperations {
  /**
   * Retrieves a list of calendar sources.
   *
   * @deprecated Duplicates {@link CalendarOperations#fetchAllCalendarSources}
   * @platform iOS
   * @since 6.6.0
   */
  fetchAllRemindersSources(): Promise<{ result: CalendarSource[] }>;
  /**
   * Opens the reminders app.
   *
   * @platform iOS
   * @since 7.1.0
   */
  openReminders(): Promise<void>;
  /**
   * Retrieves the default reminders list.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getDefaultRemindersList(): Promise<{ result: RemindersList | null }>;
  /**
   * Retrieves all available reminders lists.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getRemindersLists(): Promise<{ result: RemindersList[] }>;
  /**
   * Creates a reminder.
   *
   * @platform iOS
   * @since 0.5.0
   */
  createReminder(options: CreateReminderOptions): Promise<{ id: string }>;
  /**
   * Deletes multiple reminders.
   *
   * @deprecated Use `deleteReminder(...)`.
   * @platform iOS
   * @since 5.3.0
   */
  deleteRemindersById(
    options: DeleteRemindersByIdOptions,
  ): Promise<{ result: DeleteRemindersByIdResult }>;
  /**
   * Deletes a reminder.
   *
   * @platform iOS
   * @since 7.1.0
   */
  deleteReminder(options: DeleteReminderOptions): Promise<void>;
  /**
   * Modifies a reminder.
   *
   * @platform iOS
   * @since 6.7.0
   */
  modifyReminder(options: ModifyReminderOptions): Promise<void>;
  /**
   * Retrieve a reminder by ID.
   *
   * @platform iOS
   * @since 7.1.0
   */
  getReminderById(
    options: GetReminderByIdOptions,
  ): Promise<{ result: Reminder | null }>;
  /**
   * Retrieves reminders from multiple lists.
   *
   * @platform iOS
   * @since 5.3.0
   */
  getRemindersFromLists(
    options: GetRemindersFromListsOptions,
  ): Promise<{ result: Reminder[] }>;
  /**
   * Opens a dialog to delete a reminder.
   *
   * @platform iOS
   * @since 7.2.0
   */
  deleteReminderWithPrompt(
    options: DeleteReminderWithPromptOptions,
  ): Promise<{ deleted: boolean }>;
}

/**
 * @since 7.1.0
 */
export interface DeleteRemindersByIdResult {
  /**
   * @since 7.1.0
   */
  deleted: string[];
  /**
   * @since 7.1.0
   */
  failed: string[];
}
