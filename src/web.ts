import {
  CheckAllPermissionsResult,
  RequestAllPermissionsResult,
} from "./sub-definitions/calendar-access";
import { PermissionState, WebPlugin } from "@capacitor/core";
import type { Calendar } from "./schemas/interfaces/calendar";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import { CalendarPermissionScope } from "./schemas/enums/calendar-permission-scope";
import type { CalendarSource } from "./schemas/interfaces/calendar-source";
import type { CapacitorCalendarPlugin } from "./definitions";
import type { CreateCalendarOptions } from "./schemas/interfaces/create-calendar-options";
import type { CreateEventOptions } from "./schemas/interfaces/create-event-options";
import type { CreateEventWithPromptOptions } from "./schemas/interfaces/create-event-with-prompt-options";
import type { DeleteCalendarOptions } from "./schemas/interfaces/delete-calendar-options";
import type { EventEditAction } from "./schemas/types/event-edit-action";
import type { ModifyEventOptions } from "./schemas/interfaces/modify-event-options";
import type { ModifyEventWithPromptOptions } from "./schemas/interfaces/modify-event-with-prompt-options";
import type { OpenCalendarOptions } from "./schemas/interfaces/open-calendar-options";
import type { Reminder } from "./schemas/interfaces/reminder";
import type { ReminderRecurrenceRule } from "./schemas/interfaces/reminder-recurrence-rule";
import type { RemindersList } from "./schemas/interfaces/reminders-list";
import type { SelectCalendarsWithPromptOptions } from "./schemas/interfaces/select-calendars-with-prompt-options";

export class CapacitorCalendarWeb
  extends WebPlugin
  implements CapacitorCalendarPlugin
{
  public checkPermission(_options: {
    scope: CalendarPermissionScope;
  }): Promise<{ result: PermissionState }> {
    return this.throwUnimplemented(this.checkPermission.name);
  }

  public checkAllPermissions(): Promise<{ result: CheckAllPermissionsResult }> {
    return this.throwUnimplemented(this.checkAllPermissions.name);
  }

  public requestPermission(_options: {
    scope: CalendarPermissionScope;
  }): Promise<{ result: PermissionState }> {
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

  public createEventWithPrompt(
    _options: CreateEventWithPromptOptions,
  ): Promise<{ id: string | null }> {
    return this.throwUnimplemented(this.createEventWithPrompt.name);
  }

  public modifyEventWithPrompt(
    _options: ModifyEventWithPromptOptions,
  ): Promise<{ result: EventEditAction | null }> {
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

  public selectCalendarsWithPrompt(
    _options?: SelectCalendarsWithPromptOptions,
  ): Promise<{ result: Calendar[] }> {
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

  public createCalendar(
    _options: CreateCalendarOptions,
  ): Promise<{ id: string }> {
    return this.throwUnimplemented(this.createCalendar.name);
  }

  public deleteCalendar(_options: DeleteCalendarOptions): Promise<void> {
    return this.throwUnimplemented(this.deleteCalendar.name);
  }

  public createReminder(_options: {
    title: string;
    listId?: string;
    priority?: number;
    isCompleted?: boolean;
    startDate?: number;
    dueDate?: number;
    completionDate?: number;
    notes?: string;
    url?: string;
    location?: string;
    recurrence?: ReminderRecurrenceRule;
  }): Promise<{ result: string }> {
    throw this.unimplemented(
      `${this.createReminder.name} is not implemented on the web`,
    );
  }

  public listEventsInRange(_options: {
    startDate: number;
    endDate: number;
  }): Promise<{ result: CalendarEvent[] }> {
    throw this.unimplemented(
      `${this.listEventsInRange.name} is not implemented on the web`,
    );
  }

  public deleteEventsById(_options: { ids: string[] }): Promise<{
    result: { deleted: string[]; failed: string[] };
  }> {
    throw this.unimplemented(
      `${this.deleteEventsById.name} is not implemented on the web`,
    );
  }

  public getRemindersFromLists(_options?: {
    listIds: string[];
  }): Promise<{ result: Reminder[] }> {
    throw this.unimplemented(
      `${this.getRemindersFromLists.name} is not implemented on the web`,
    );
  }

  public deleteRemindersById(_options: {
    ids: string[];
  }): Promise<{ result: { deleted: string[]; failed: string[] } }> {
    throw this.unimplemented(
      `${this.deleteRemindersById.name} is not implemented on the web`,
    );
  }

  modifyReminder(_options: {
    id: string;
    update: {
      title?: string;
      listId?: string;
      priority?: number;
      isCompleted?: boolean;
      startDate?: number;
      dueDate?: number;
      completionDate?: number;
      notes?: string;
      url?: string;
      location?: string;
      recurrence?: ReminderRecurrenceRule;
    };
  }): Promise<void> {
    throw this.unimplemented(
      `${this.modifyReminder.name} is not implemented on the web`,
    );
  }

  private throwUnimplemented<T>(methodName: string): Promise<T> {
    return Promise.reject(
      this.unimplemented(`${methodName} is not implemented on the web.`),
    );
  }
}
