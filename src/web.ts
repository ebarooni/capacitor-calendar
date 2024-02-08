import { WebPlugin } from '@capacitor/core';

import type {CapacitorCalendarPlugin, CreateEventAction} from './definitions';

export class CapacitorCalendarWeb
    extends WebPlugin
    implements CapacitorCalendarPlugin
{
    public createEventWithPrompt(): Promise<CreateEventAction> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }
}
