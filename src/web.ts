import type { PermissionState } from '@capacitor/core';
import { WebPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';
import type { CalendarPermissionScope } from './schemas/enums/calendar-permission-scope';
import type { Calendar } from './schemas/interfaces/calendar';
import type { CalendarEvent } from './schemas/interfaces/calendar-event';
import type { CalendarSource } from './schemas/interfaces/calendar-source';
import type { CreateCalendarOptions } from './schemas/interfaces/create-calendar-options';
import type { CreateEventOptions } from './schemas/interfaces/create-event-options';
import type { CreateEventWithPromptOptions } from './schemas/interfaces/create-event-with-prompt-options';
import type { CreateReminderOptions } from './schemas/interfaces/create-reminder-options';
import type { DeleteCalendarOptions } from './schemas/interfaces/delete-calendar-options';
import type { DeleteEventOptions } from './schemas/interfaces/delete-event-options';
import type { DeleteEventWithPromptOptions } from './schemas/interfaces/delete-event-with-prompt-options';
import type { DeleteEventsByIdOptions } from './schemas/interfaces/delete-events-by-id-options';
import type { DeleteReminderOptions } from './schemas/interfaces/delete-reminder-options';
import type { DeleteReminderWithPromptOptions } from './schemas/interfaces/delete-reminder-with-prompt-options';
import type { DeleteRemindersByIdOptions } from './schemas/interfaces/delete-reminders-by-id-options';
import type { GetReminderByIdOptions } from './schemas/interfaces/get-reminder-by-id-options';
import type { GetRemindersFromListsOptions } from './schemas/interfaces/get-reminders-from-lists-options';
import type { ListEventsInRangeOptions } from './schemas/interfaces/list-events-in-range-options';
import type { ModifyCalendarOptions } from './schemas/interfaces/modify-calendar-options';
import type { ModifyEventOptions } from './schemas/interfaces/modify-event-options';
import type { ModifyEventWithPromptOptions } from './schemas/interfaces/modify-event-with-prompt-options';
import type { ModifyReminderOptions } from './schemas/interfaces/modify-reminder-options';
import type { OpenCalendarOptions } from './schemas/interfaces/open-calendar-options';
import type { Reminder } from './schemas/interfaces/reminder';
import type { RemindersList } from './schemas/interfaces/reminders-list';
import type { SelectCalendarsWithPromptOptions } from './schemas/interfaces/select-calendars-with-prompt-options';
import type { EventEditAction } from './schemas/types/event-edit-action';
import type { CheckAllPermissionsResult, RequestAllPermissionsResult } from './sub-definitions/calendar-access';
import type { DeleteEventsByIdResult } from './sub-definitions/event-operations';
import type { DeleteRemindersByIdResult } from './sub-definitions/reminders-operations';

export class CapacitorCalendarWeb extends WebPlugin implements CapacitorCalendarPlugin {
  public checkPermission(_options: { scope: CalendarPermissionScope }): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.checkPermission.name);
  }

  public checkAllPermissions(): Promise<{ result: CheckAllPermissionsResult }> {
    return this.throwUnimplemented(this.checkAllPermissions.name);
  }

  public requestPermission(_options: { scope: CalendarPermissionScope }): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.requestPermission.name);
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

  public createEventWithPrompt(_options: CreateEventWithPromptOptions): Promise<{ id: string | null }> {
    return this.throwUnimplemented(this.createEventWithPrompt.name);
  }

  public modifyEventWithPrompt(_options: ModifyEventWithPromptOptions): Promise<{ result: EventEditAction | null }> {
    return this.throwUnimplemented(this.modifyEventWithPrompt.name);
  }

  public createEvent(_options: CreateEventOptions): Promise<{
    id: string;
  }> {
    return this.throwUnimplemented(this.createEvent.name);
  }

  public commit(): Promise<void> {
    return this.throwUnimplemented(this.commit.name);
  }

  public modifyEvent(_options: ModifyEventOptions): Promise<void> {
    return this.throwUnimplemented(this.modifyEvent.name);
  }

  public selectCalendarsWithPrompt(_options?: SelectCalendarsWithPromptOptions): Promise<{ result: Calendar[] }> {
    return this.throwUnimplemented(this.selectCalendarsWithPrompt.name);
  }

  public fetchAllCalendarSources(): Promise<{ result: CalendarSource[] }> {
    return this.throwUnimplemented(this.fetchAllCalendarSources.name);
  }

  public listCalendars(): Promise<{ result: Calendar[] }> {
    return this.throwUnimplemented(this.listCalendars.name);
  }

  public fetchAllRemindersSources(): Promise<{ result: CalendarSource[] }> {
    return this.throwUnimplemented(this.fetchAllRemindersSources.name);
  }

  public getDefaultCalendar(): Promise<{ result: Calendar | null }> {
    return this.throwUnimplemented(this.getDefaultCalendar.name);
  }

  public getDefaultRemindersList(): Promise<{ result: RemindersList | null }> {
    return this.throwUnimplemented(this.getDefaultRemindersList.name);
  }

  public openReminders(): Promise<void> {
    return this.throwUnimplemented(this.openReminders.name);
  }

  public getRemindersLists(): Promise<{ result: RemindersList[] }> {
    return this.throwUnimplemented(this.getRemindersLists.name);
  }

  public openCalendar(_options: OpenCalendarOptions): Promise<void> {
    return this.throwUnimplemented(this.openCalendar.name);
  }

  public createCalendar(_options: CreateCalendarOptions): Promise<{ id: string }> {
    return this.throwUnimplemented(this.createCalendar.name);
  }

  public deleteCalendar(_options: DeleteCalendarOptions): Promise<void> {
    return this.throwUnimplemented(this.deleteCalendar.name);
  }

  public createReminder(_options: CreateReminderOptions): Promise<{ id: string }> {
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

  public getReminderById(_options: GetReminderByIdOptions): Promise<{ result: Reminder | null }> {
    return this.throwUnimplemented(this.getReminderById.name);
  }

  public getRemindersFromLists(_options: GetRemindersFromListsOptions): Promise<{ result: Reminder[] }> {
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

  public listEventsInRange(_options: ListEventsInRangeOptions): Promise<{ result: CalendarEvent[] }> {
    return this.throwUnimplemented(this.listEventsInRange.name);
  }

  public modifyCalendar(_options: ModifyCalendarOptions): Promise<void> {
    return this.throwUnimplemented(this.modifyCalendar.name);
  }

  public deleteReminderWithPrompt(_options: DeleteReminderWithPromptOptions): Promise<{ deleted: boolean }> {
    return this.throwUnimplemented(this.deleteReminderWithPrompt.name);
  }

  private throwUnimplemented<T>(methodName: string): Promise<T> {
    return Promise.reject(this.unimplemented(`${methodName} is not implemented on the web.`));
  }
}
