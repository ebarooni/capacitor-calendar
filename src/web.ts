import type { PermissionState } from '@capacitor/core';
import { WebPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';
import type { Calendar } from './schemas/interfaces/calendar';
import type { CheckPermissionOptions } from './schemas/interfaces/check-permission-options';
import type { CreateCalendarOptions } from './schemas/interfaces/create-calendar-options';
import type { CreateCalendarResult } from './schemas/interfaces/create-calendar-result';
import type { CreateEventOptions } from './schemas/interfaces/create-event-options';
import type { CreateEventResult } from './schemas/interfaces/create-event-result';
import type { CreateEventWithPromptOptions } from './schemas/interfaces/create-event-with-prompt-options';
import type { CreateEventWithPromptResult } from './schemas/interfaces/create-event-with-prompt-result';
import type { CreateReminderOptions } from './schemas/interfaces/create-reminder-options';
import type { CreateReminderResult } from './schemas/interfaces/create-reminder-result';
import type { CreateRemindersListOptions } from './schemas/interfaces/create-reminders-list-options';
import type { CreateRemindersListResult } from './schemas/interfaces/create-reminders-list-result';
import type { DeleteCalendarOptions } from './schemas/interfaces/delete-calendar-options';
import type { DeleteEventOptions } from './schemas/interfaces/delete-event-options';
import type { DeleteEventWithPromptOptions } from './schemas/interfaces/delete-event-with-prompt-options';
import type { DeleteEventsByIdOptions } from './schemas/interfaces/delete-events-by-id-options';
import type { DeleteReminderOptions } from './schemas/interfaces/delete-reminder-options';
import type { DeleteReminderWithPromptOptions } from './schemas/interfaces/delete-reminder-with-prompt-options';
import type { DeleteReminderWithPromptResult } from './schemas/interfaces/delete-reminder-with-prompt-result';
import type { DeleteRemindersByIdOptions } from './schemas/interfaces/delete-reminders-by-id-options';
import type { DeleteRemindersByIdResult } from './schemas/interfaces/delete-reminders-by-id-result';
import type { DeleteRemindersListOptions } from './schemas/interfaces/delete-reminders-list-options';
import type { FetchAllCalendarSourcesResult } from './schemas/interfaces/fetch-all-calendar-sources-result';
import type { GetDefaultCalendarOptions } from './schemas/interfaces/get-default-calendar-options';
import type { GetDefaultRemindersListResult } from './schemas/interfaces/get-default-reminders-list-result';
import type { GetReminderByIdOptions } from './schemas/interfaces/get-reminder-by-id-options';
import type { GetReminderByIdResult } from './schemas/interfaces/get-reminder-by-id-result';
import type { GetRemindersFromListsOptions } from './schemas/interfaces/get-reminders-from-lists-options';
import type { GetRemindersFromListsResult } from './schemas/interfaces/get-reminders-from-lists-result';
import type { GetRemindersListsResult } from './schemas/interfaces/get-reminders-lists-result';
import type { ListCalendarsResult } from './schemas/interfaces/list-calendars-result';
import type { ListEventsInRangeOptions } from './schemas/interfaces/list-events-in-range-options';
import type { ListEventsInRangeResult } from './schemas/interfaces/list-events-in-range-result';
import type { ModifyCalendarOptions } from './schemas/interfaces/modify-calendar-options';
import type { ModifyEventOptions } from './schemas/interfaces/modify-event-options';
import type { ModifyEventWithPromptOptions } from './schemas/interfaces/modify-event-with-prompt-options';
import type { ModifyReminderOptions } from './schemas/interfaces/modify-reminder-options';
import type { OpenCalendarOptions } from './schemas/interfaces/open-calendar-options';
import type { RequestPermissionOptions } from './schemas/interfaces/request-permission-options';
import type { SelectCalendarsWithPromptOptions } from './schemas/interfaces/select-calendars-with-prompt-options';
import type { SelectCalendarsWithPromptResult } from './schemas/interfaces/select-calendars-with-prompt-result';
import type { UpdateRemindersListOptions } from './schemas/interfaces/update-reminders-list-options';
import type { UpdateRemindersListResult } from './schemas/interfaces/update-reminders-list-result';
import type { EventEditAction } from './schemas/types/event-edit-action';
import type { CheckAllPermissionsResult, RequestAllPermissionsResult } from './sub-definitions/calendar-access';
import type { DeleteEventsByIdResult } from './sub-definitions/event-operations';
import { downloadIcsFile } from './web/download-ics-file';
import { buildEventIcs, resolveEndDate, resolveIcsFileName } from './web/ics';

const DAY_MS = 24 * 60 * 60 * 1000;

export class CapacitorCalendarWeb extends WebPlugin implements CapacitorCalendarPlugin {
  public checkPermission(_options: CheckPermissionOptions): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.checkPermission.name);
  }

  public checkAllPermissions(): Promise<{ result: CheckAllPermissionsResult }> {
    return this.throwUnimplemented(this.checkAllPermissions.name);
  }

  public requestPermission(_options: RequestPermissionOptions): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.requestPermission.name);
  }

  public createRemindersList(_options: CreateRemindersListOptions): Promise<CreateRemindersListResult> {
    return this.throwUnimplemented(this.createRemindersList.name);
  }

  public deleteRemindersList(_options: DeleteRemindersListOptions): Promise<void> {
    return this.throwUnimplemented(this.deleteRemindersList.name);
  }

  public requestAllPermissions(): Promise<{
    result: RequestAllPermissionsResult;
  }> {
    return this.throwUnimplemented(this.requestAllPermissions.name);
  }

  public requestWriteOnlyCalendarAccess(): Promise<{
    result: PermissionState;
  }> {
    return this.throwUnimplemented(this.requestWriteOnlyCalendarAccess.name);
  }

  public requestReadOnlyCalendarAccess(): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.requestReadOnlyCalendarAccess.name);
  }

  public requestFullCalendarAccess(): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.requestFullCalendarAccess.name);
  }

  public requestFullRemindersAccess(): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.requestFullRemindersAccess.name);
  }

  public async createEventWithPrompt(options: CreateEventWithPromptOptions = {}): Promise<CreateEventWithPromptResult> {
    try {
      const confirmed = window.confirm(buildCreateEventConfirmMessage(options));
      if (!confirmed) {
        return { id: null, ics: null };
      }

      const createOptions = mapPromptOptionsToCreateEvent(options);
      const content = buildEventIcs(createOptions);
      const ics = new File([content], resolveIcsFileName(createOptions), {
        type: 'text/calendar;charset=utf-8',
      });

      if (options.autoDownloadIcsFile !== false) {
        await downloadIcsFile(ics);
      }

      return { id: null, ics };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return Promise.reject(new Error(message));
    }
  }

  public modifyEventWithPrompt(_options: ModifyEventWithPromptOptions): Promise<{ result: EventEditAction | null }> {
    return this.throwUnimplemented(this.modifyEventWithPrompt.name);
  }

  public async createEvent(options: CreateEventOptions): Promise<CreateEventResult> {
    try {
      const content = buildEventIcs(options);
      const ics = new File([content], resolveIcsFileName(options), {
        type: 'text/calendar;charset=utf-8',
      });
      if (options.autoDownloadIcsFile === true) {
        await downloadIcsFile(ics);
      }
      return { id: null, ics };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return Promise.reject(new Error(message));
    }
  }

  public commit(): Promise<void> {
    return this.throwUnimplemented(this.commit.name);
  }

  public modifyEvent(_options: ModifyEventOptions): Promise<void> {
    return this.throwUnimplemented(this.modifyEvent.name);
  }

  public selectCalendarsWithPrompt(
    _options?: SelectCalendarsWithPromptOptions,
  ): Promise<SelectCalendarsWithPromptResult> {
    return this.throwUnimplemented(this.selectCalendarsWithPrompt.name);
  }

  public fetchAllCalendarSources(): Promise<FetchAllCalendarSourcesResult> {
    return this.throwUnimplemented(this.fetchAllCalendarSources.name);
  }

  public listCalendars(): Promise<ListCalendarsResult> {
    return this.throwUnimplemented(this.listCalendars.name);
  }

  public fetchAllRemindersSources(): Promise<FetchAllCalendarSourcesResult> {
    return this.throwUnimplemented(this.fetchAllRemindersSources.name);
  }

  public getDefaultCalendar(_options?: GetDefaultCalendarOptions): Promise<{ result: Calendar | null }> {
    return this.throwUnimplemented(this.getDefaultCalendar.name);
  }

  public getDefaultRemindersList(): Promise<GetDefaultRemindersListResult> {
    return this.throwUnimplemented(this.getDefaultRemindersList.name);
  }

  public openReminders(): Promise<void> {
    return this.throwUnimplemented(this.openReminders.name);
  }

  public getRemindersLists(): Promise<GetRemindersListsResult> {
    return this.throwUnimplemented(this.getRemindersLists.name);
  }

  public openCalendar(_options?: OpenCalendarOptions): Promise<void> {
    return this.throwUnimplemented(this.openCalendar.name);
  }

  public createCalendar(_options: CreateCalendarOptions): Promise<CreateCalendarResult> {
    return this.throwUnimplemented(this.createCalendar.name);
  }

  public deleteCalendar(_options: DeleteCalendarOptions): Promise<void> {
    return this.throwUnimplemented(this.deleteCalendar.name);
  }

  public createReminder(_options: CreateReminderOptions): Promise<CreateReminderResult> {
    return this.throwUnimplemented(this.createReminder.name);
  }

  public deleteRemindersById(_options: DeleteRemindersByIdOptions): Promise<{ result: DeleteRemindersByIdResult }> {
    return this.throwUnimplemented(this.deleteRemindersById.name);
  }

  public deleteReminder(_options: DeleteReminderOptions): Promise<void> {
    return this.throwUnimplemented(this.deleteReminder.name);
  }

  public modifyReminder(_options: ModifyReminderOptions): Promise<void> {
    return this.throwUnimplemented(this.modifyReminder.name);
  }

  public getReminderById(_options: GetReminderByIdOptions): Promise<GetReminderByIdResult> {
    return this.throwUnimplemented(this.getReminderById.name);
  }

  public getRemindersFromLists(_options: GetRemindersFromListsOptions): Promise<GetRemindersFromListsResult> {
    return this.throwUnimplemented(this.getRemindersFromLists.name);
  }

  public deleteEventsById(_options: DeleteEventsByIdOptions): Promise<{
    result: DeleteEventsByIdResult;
  }> {
    return this.throwUnimplemented(this.deleteEventsById.name);
  }

  public deleteEvent(_options: DeleteEventOptions): Promise<void> {
    return this.throwUnimplemented(this.deleteEvent.name);
  }

  public deleteEventWithPrompt(_options: DeleteEventWithPromptOptions): Promise<{ deleted: boolean }> {
    return this.throwUnimplemented(this.deleteEventWithPrompt.name);
  }

  public listEventsInRange(_options: ListEventsInRangeOptions): Promise<ListEventsInRangeResult> {
    return this.throwUnimplemented(this.listEventsInRange.name);
  }

  public modifyCalendar(_options: ModifyCalendarOptions): Promise<void> {
    return this.throwUnimplemented(this.modifyCalendar.name);
  }

  public deleteReminderWithPrompt(_options: DeleteReminderWithPromptOptions): Promise<DeleteReminderWithPromptResult> {
    return this.throwUnimplemented(this.deleteReminderWithPrompt.name);
  }

  public updateRemindersList(_options: UpdateRemindersListOptions): Promise<UpdateRemindersListResult> {
    return this.throwUnimplemented(this.updateRemindersList.name);
  }

  private throwUnimplemented<T>(methodName: string): Promise<T> {
    return Promise.reject(this.unimplemented(`${methodName} is not implemented on the web.`));
  }
}

function mapPromptOptionsToCreateEvent(options: CreateEventWithPromptOptions): CreateEventOptions {
  return {
    alerts: options.alerts,
    availability: options.availability,
    description: options.description,
    endDate: options.endDate,
    icsFileName: options.icsFileName,
    isAllDay: options.isAllDay,
    location: options.location,
    recurrence: options.recurrence,
    startDate: options.startDate,
    title: options.title ?? '',
    url: options.url,
  };
}

function buildCreateEventConfirmMessage(options: CreateEventWithPromptOptions): string {
  const custom = options.promptMessage?.trim();
  if (custom != null && custom.length > 0) {
    return custom;
  }

  const title = normalizeConfirmTitle(options.title);
  const timeSummary = formatEventTimeSummary(options);
  return `Create event?\n\n${title}\n${timeSummary}`;
}

function normalizeConfirmTitle(title?: string): string {
  const collapsed = (title ?? '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return collapsed.length > 0 ? collapsed : 'Untitled event';
}

function formatEventTimeSummary(options: CreateEventWithPromptOptions): string {
  const startDate = options.startDate ?? Date.now();
  const isAllDay = options.isAllDay === true;
  const endDate = resolveEndDate(startDate, options.endDate, undefined, isAllDay);

  if (isAllDay) {
    const startDay = formatLocalDate(startDate);
    const lastInclusiveMs = endDate - DAY_MS;
    const lastDay = formatLocalDate(lastInclusiveMs);
    if (lastDay <= startDay) {
      return `All day · ${formatDisplayDate(startDate)}`;
    }
    return `All day · ${formatDisplayDate(startDate)} – ${formatDisplayDate(lastInclusiveMs)}`;
  }

  return `${formatDisplayDateTime(startDate)} – ${formatDisplayDateTime(endDate)}`;
}

function formatLocalDate(ms: number): string {
  const date = new Date(ms);
  const fullYear = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(date.getDate()).padStart(2, '0');
  return `${fullYear}-${month}-${dayOfMonth}`;
}

function formatDisplayDate(ms: number): string {
  return new Date(ms).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDisplayDateTime(ms: number): string {
  return new Date(ms).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
