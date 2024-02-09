import { WebPlugin } from '@capacitor/core';

import type {CapacitorCalendarPlugin, CalendarEventActionResult, CalendarPermissionStatus} from './definitions';

export class CapacitorCalendarWeb
    extends WebPlugin
    implements CapacitorCalendarPlugin
{
    public checkPermissions(): Promise<CalendarPermissionStatus> {
        throw this.unimplemented(`${this.checkPermissions.name} is not implemented on the web`);
    }

    public requestPermissions(): Promise<CalendarPermissionStatus> {
        throw this.unimplemented(`${this.requestPermissions.name} is not implemented on the web`);
    }

    public createEventWithPrompt(): Promise<{ result: CalendarEventActionResult}> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }
}
