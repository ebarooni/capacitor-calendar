import {PermissionState, WebPlugin} from '@capacitor/core';

import  {CapacitorCalendarPlugin, CalendarEventActionResult, CalendarPermissionStatus} from './definitions';

export class CapacitorCalendarWeb
    extends WebPlugin
    implements CapacitorCalendarPlugin
{
    public checkPermission(_permission: keyof CalendarPermissionStatus): Promise<{ result: PermissionState }> {
        throw this.unimplemented(`${this.checkPermission.name} is not implemented on the web`)
    }

    public checkAllPermissions(): Promise<CalendarPermissionStatus> {
        throw this.unimplemented(`${this.checkAllPermissions.name} is not implemented on the web`);
    }

    public requestPermission(_permission: keyof CalendarPermissionStatus): Promise<{ result: PermissionState }> {
        throw this.unimplemented(`${this.requestPermission.name} is not implemented on the web`);
    }

    public requestAllPermissions(): Promise<CalendarPermissionStatus> {
        throw this.unimplemented(`${this.requestAllPermissions.name} is not implemented on the web`);
    }

    public createEventWithPrompt(): Promise<{ result: CalendarEventActionResult}> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }
}
