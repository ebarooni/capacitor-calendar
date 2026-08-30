import type { Calendar } from '../schemas/interfaces/calendar';
import type { CreateCalendarOptions } from '../schemas/interfaces/create-calendar-options';
import type { CreateCalendarResult } from '../schemas/interfaces/create-calendar-result';
import type { DeleteCalendarOptions } from '../schemas/interfaces/delete-calendar-options';
import type { FetchAllCalendarSourcesResult } from '../schemas/interfaces/fetch-all-calendar-sources-result';
import type { GetDefaultCalendarOptions } from '../schemas/interfaces/get-default-calendar-options';
import type { ListCalendarsResult } from '../schemas/interfaces/list-calendars-result';
import type { ModifyCalendarOptions } from '../schemas/interfaces/modify-calendar-options';
import type { OpenCalendarOptions } from '../schemas/interfaces/open-calendar-options';
import type { SelectCalendarsWithPromptOptions } from '../schemas/interfaces/select-calendars-with-prompt-options';
import type { SelectCalendarsWithPromptResult } from '../schemas/interfaces/select-calendars-with-prompt-result';

export interface CalendarOperations {
  /**
   * Saves pending calendar changes.
   *
   * @platform iOS
   * @since 7.1.0
   */
  commit(): Promise<void>;
  /**
   * Opens a system interface to choose one or multiple calendars.
   *
   * Calendar access is expected. Call `requestFullCalendarAccess()` first.
   * Without authorization the chooser can look empty.
   *
   * On confirm, `result` contains the calendars the user selected.
   * On cancel, `result` is an empty array.
   *
   * If a chooser is already presented, a new call is rejected; the in-flight
   * call continues until the user confirms or cancels.
   *
   * @platform iOS
   * @since 0.2.0
   */
  selectCalendarsWithPrompt(options?: SelectCalendarsWithPromptOptions): Promise<SelectCalendarsWithPromptResult>;
  /**
   * Retrieves a list of calendar sources.
   *
   * Requires calendar access. Without authorization, `result` is typically
   * an empty array. This method does not reject solely for missing permission.
   *
   * @platform iOS
   * @since 6.6.0
   */
  fetchAllCalendarSources(): Promise<FetchAllCalendarSourcesResult>;
  /**
   * Retrieves a list of all available calendars.
   *
   * Requires calendar read access. On Android, missing permission typically
   * rejects. On iOS, missing authorization typically returns an empty `result`.
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  listCalendars(): Promise<ListCalendarsResult>;
  /**
   * Retrieves the default calendar.
   *
   * Requires calendar read access. On Android, missing permission typically
   * rejects. On iOS, missing authorization typically yields `result: null`.
   *
   * The system default is the primary calendar on Android and
   * `defaultCalendarForNewEvents` on iOS. When neither exists and
   * `useFallbackCalendar` is true, the first available calendar is returned.
   * Otherwise the method returns `null` when there is no system default.
   *
   * @platform Android, iOS
   * @since 0.3.0
   */
  getDefaultCalendar(options?: GetDefaultCalendarOptions): Promise<{ result: Calendar | null }>;
  /**
   * Opens the calendar app.
   *
   * @example
   * CapacitorCalendar.openCalendar({ date: Date.now() });
   *
   * @platform Android, iOS
   * @since 7.1.0
   */
  openCalendar(options?: OpenCalendarOptions): Promise<void>;
  /**
   * Creates a calendar.
   *
   * `title` is required. `color` is optional and defaults to `#007AFF`.
   * On Android, `accountName` and `ownerAccount` are required at runtime.
   *
   * @example
   * CapacitorCalendar.createCalendar({
   *   title: 'Work',
   *   accountName: 'plugin@example.com',
   *   ownerAccount: 'plugin@example.com',
   * });
   *
   * @throws {Error} `Title must be provided.` — when `title` is missing.
   * @throws {Error} `Invalid color format.` — when `color` is present but invalid.
   * @throws {Error} `Account name must be provided.` — when `accountName` is missing on Android.
   * @throws {Error} `Owner account must be provided.` — when `ownerAccount` is missing on Android.
   * @throws {Error} `Calendar source not found.` — when `sourceId` is set and no EventKit source matches (iOS).
   * @throws {Error} `Failed to retrieve calendar ID.` — when the calendar is created but no id is returned.
   *
   * @platform Android, iOS
   * @since 5.2.0
   */
  createCalendar(options: CreateCalendarOptions): Promise<CreateCalendarResult>;
  /**
   * Deletes a calendar by id.
   *
   * @throws {Error} `Calendar ID must be provided.` — when `id` is missing.
   * @throws {Error} `Invalid calendar ID.` — when `id` is not a numeric Android calendar id.
   * @throws {Error} `Calendar not found.` — when no calendar exists for `id`.
   *
   * @platform Android, iOS
   * @since 5.2.0
   */
  deleteCalendar(options: DeleteCalendarOptions): Promise<void>;
  /**
   * Modifies a calendar with options.
   *
   * @throws {Error} `Calendar ID must be provided.` — when `id` is missing.
   * @throws {Error} `Invalid calendar ID.` — when `id` is not a numeric Android calendar id.
   * @throws {Error} `At least one of title or color must be provided.` — when both are omitted.
   * @throws {Error} `Invalid color format.` — when `color` is present but invalid.
   * @throws {Error} `Calendar not found.` — when no calendar exists for `id`.
   * @throws {Error} `Calendar is not modifiable.` — when the calendar cannot be modified (iOS).
   *
   * @platform Android, iOS
   * @since 7.2.0
   */
  modifyCalendar(options: ModifyCalendarOptions): Promise<void>;
}
