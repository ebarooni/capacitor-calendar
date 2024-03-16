import {PermissionState, WebPlugin} from '@capacitor/core';

import {CapacitorCalendarPlugin, CalendarPermissionStatus, Calendar} from './definitions';

export class CapacitorCalendarWeb
    extends WebPlugin
    implements CapacitorCalendarPlugin
{
    public checkPermission(_options: { alias: keyof CalendarPermissionStatus }): Promise<{ result: PermissionState }> {
        throw this.unimplemented(`${this.checkPermission.name} is not implemented on the web`)
    }

    public checkAllPermissions(): Promise<CalendarPermissionStatus> {
        throw this.unimplemented(`${this.checkAllPermissions.name} is not implemented on the web`);
    }

    public requestPermission(_options: { alias: keyof CalendarPermissionStatus }): Promise<{ result: PermissionState }> {
        throw this.unimplemented(`${this.requestPermission.name} is not implemented on the web`);
    }

    public requestAllPermissions(): Promise<CalendarPermissionStatus> {
        throw this.unimplemented(`${this.requestAllPermissions.name} is not implemented on the web`);
    }

    public createEventWithPrompt(): Promise<{ eventCreated: boolean}> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }

    public selectCalendarsWithPrompt(): Promise<{ result: Calendar[] }> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }

    public listCalendars(): Promise<{ result: Calendar[] }> {
        throw this.unimplemented(`${this.listCalendars.name} is not implemented on the web`);
    }

    public getDefaultCalendar(): Promise<{ result: Calendar }> {
        throw this.unimplemented(`${this.getDefaultCalendar.name} is not implemented on the web`);
    }

    public createEvent(_options: { title: string; calendarId?: string, location?: string; startDate?: Date; endDate?: Date, isAllDay?: boolean }): Promise<{
        eventCreated: boolean
    }> {
        throw this.unimplemented(`${this.createEvent.name} is not implemented on the web`);
    }

    public createReminder(_options: { title: string }): Promise<{ reminderCreated: boolean }> {
        throw this.unimplemented(`${this.createReminder.name} is not implemented on the web`);
    }

    public getDefaultRemindersList(): Promise<{ result: Calendar }> {
        throw this.unimplemented(`${this.createReminder.name} is not implemented on the web`);
    }

    public getRemindersLists(): Promise<{ result: Calendar[] }> {
        throw this.unimplemented(`${this.createReminder.name} is not implemented on the web`);
    }
}
