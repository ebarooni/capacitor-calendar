import { PermissionState, WebPlugin } from "@capacitor/core";
import { CapacitorCalendarPlugin } from "./definitions";
import { PluginPermission } from "./schemas/enums/plugin-permission";
import { ReminderRecurrenceRule } from "./schemas/interfaces/reminder-recurrence-rule";
import { EventSpan } from "./schemas/enums/event-span";
import type { Calendar } from "./schemas/interfaces/calendar";
import type { RemindersList } from "./schemas/interfaces/reminders-list";
import type { PluginPermissionsMap } from "./schemas/interfaces/plugin-permissions-map";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import type { Reminder } from "./schemas/interfaces/reminder";
import type { CalendarSource } from "./schemas/interfaces/calendar-source";

export class CapacitorCalendarWeb
  extends WebPlugin
  implements CapacitorCalendarPlugin
{
  public checkPermission(_options: {
    alias: PluginPermission;
  }): Promise<{ result: PermissionState }> {
    throw this.unimplemented(
      `${this.checkPermission.name} is not implemented on the web`,
    );
  }

  public checkAllPermissions(): Promise<PluginPermissionsMap> {
    throw this.unimplemented(
      `${this.checkAllPermissions.name} is not implemented on the web`,
    );
  }

  public requestPermission(_options: {
    alias: PluginPermission;
  }): Promise<{ result: PermissionState }> {
    throw this.unimplemented(
      `${this.requestPermission.name} is not implemented on the web`,
    );
  }

  public requestAllPermissions(): Promise<PluginPermissionsMap> {
    throw this.unimplemented(
      `${this.requestAllPermissions.name} is not implemented on the web`,
    );
  }

  public createEventWithPrompt(_options: {
    title: string;
    calendarId?: string;
    location?: string;
    startDate?: number;
    endDate?: number;
    isAllDay?: boolean;
    alertOffsetInMinutes?: number | number[];
    url?: string;
    notes?: string;
  }): Promise<{ result: string[] }> {
    throw this.unimplemented(
      `${this.createEventWithPrompt.name} is not implemented on the web`,
    );
  }

  public selectCalendarsWithPrompt(): Promise<{ result: Calendar[] }> {
    throw this.unimplemented(
      `${this.selectCalendarsWithPrompt.name} is not implemented on the web`,
    );
  }

  public listCalendars(): Promise<{ result: Calendar[] }> {
    throw this.unimplemented(
      `${this.listCalendars.name} is not implemented on the web`,
    );
  }

  public getDefaultCalendar(): Promise<{ result: Calendar | null }> {
    throw this.unimplemented(
      `${this.getDefaultCalendar.name} is not implemented on the web`,
    );
  }

  public createEvent(_options: {
    title: string;
    calendarId?: string;
    location?: string;
    startDate?: number;
    endDate?: number;
    isAllDay?: boolean;
    alertOffsetInMinutes?: number | number[];
    url?: string;
    notes?: string;
  }): Promise<{
    result: string;
  }> {
    throw this.unimplemented(
      `${this.createEvent.name} is not implemented on the web`,
    );
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

  public getDefaultRemindersList(): Promise<{ result: RemindersList }> {
    throw this.unimplemented(
      `${this.getDefaultRemindersList.name} is not implemented on the web`,
    );
  }

  public getRemindersLists(): Promise<{ result: RemindersList[] }> {
    throw this.unimplemented(
      `${this.getRemindersLists.name} is not implemented on the web`,
    );
  }

  public openCalendar(_options: { date?: number }): Promise<void> {
    throw this.unimplemented(
      `${this.openCalendar.name} is not implemented on the web`,
    );
  }

  public openReminders(): Promise<void> {
    throw this.unimplemented(
      `${this.openReminders.name} is not implemented on the web`,
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

  public createCalendar(_options: {
    title: string;
    color?: string;
    sourceId?: string;
  }): Promise<{ result: string }> {
    throw this.unimplemented(
      `${this.createCalendar.name} is not implemented on the web`,
    );
  }

  public deleteCalendar(_options: { id: string }): Promise<void> {
    throw this.unimplemented(
      `${this.deleteCalendar.name} is not implemented on the web`,
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

  public requestWriteOnlyCalendarAccess(): Promise<{
    result: PermissionState;
  }> {
    throw this.unimplemented(
      `${this.requestWriteOnlyCalendarAccess.name} is not implemented on the web`,
    );
  }

  public requestReadOnlyCalendarAccess(): Promise<{ result: PermissionState }> {
    throw this.unimplemented(
      `${this.requestReadOnlyCalendarAccess.name} is not implemented on the web`,
    );
  }

  public requestFullCalendarAccess(): Promise<{ result: PermissionState }> {
    throw this.unimplemented(
      `${this.requestFullCalendarAccess.name} is not implemented on the web`,
    );
  }

  public requestFullRemindersAccess(): Promise<{ result: PermissionState }> {
    throw this.unimplemented(
      `${this.requestFullRemindersAccess.name} is not implemented on the web`,
    );
  }

  public modifyEventWithPrompt(_options: {
    id: string;
    update?: {
      title?: string;
      calendarId?: string;
      location?: string;
      startDate?: number;
      endDate?: number;
      isAllDay?: boolean;
      alertOffsetInMinutes?: number | number[];
      url?: string;
      notes?: string;
    };
  }): Promise<{ result: string[] }> {
    throw this.unimplemented(
      `${this.modifyEventWithPrompt.name} is not implemented on the web`,
    );
  }

  public modifyEvent(_options: {
    id: string;
    span?: EventSpan;
    update: {
      title?: string;
      calendarId?: string;
      location?: string;
      startDate?: number;
      endDate?: number;
      isAllDay?: boolean;
      alertOffsetInMinutes?: number | number[];
      url?: string;
      notes?: string;
    };
  }): Promise<void> {
    throw this.unimplemented(
      `${this.modifyEvent.name} is not implemented on the web`,
    );
  }

  public fetchAllCalendarSources(): Promise<{ result: CalendarSource[] }> {
    throw this.unimplemented(
      `${this.fetchAllCalendarSources.name} is not implemented on the web`,
    );
  }

  public fetchAllRemindersSources(): Promise<{ result: CalendarSource[] }> {
    throw this.unimplemented(
      `${this.fetchAllRemindersSources.name} is not implemented on the web`,
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
}
