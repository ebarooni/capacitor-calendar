import { WebPlugin } from '@capacitor/core';

import type {CapacitorCalendarPlugin, CreateEventAction, PermissionStatus} from './definitions';

export class CapacitorCalendarWeb
    extends WebPlugin
    implements CapacitorCalendarPlugin
{
    public checkPermissions(): Promise<PermissionStatus> {
        throw this.unimplemented(`${this.checkPermissions.name} is not implemented on the web`);
    }

    public requestPermissions(): Promise<PermissionStatus> {
        throw this.unimplemented(`${this.requestPermissions.name} is not implemented on the web`);
    }

    public createEventWithPrompt(): Promise<CreateEventAction> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }
}
