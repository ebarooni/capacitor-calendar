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

    listCalendars(): Promise<{ result: Calendar[] }> {
        throw this.unimplemented(`${this.listCalendars.name} is not implemented on the web`);
    }

    getDefaultCalendar(): Promise<{ result: Calendar }> {
        throw this.unimplemented(`${this.getDefaultCalendar.name} is not implemented on the web`);
    }
}
