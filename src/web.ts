import { WebPlugin } from '@capacitor/core';

import type {CapacitorCalendarPlugin, ICreateEventAction} from './definitions';

export class CapacitorCalendarWeb
    extends WebPlugin
    implements CapacitorCalendarPlugin
{
    public createEventWithPrompt(): Promise<ICreateEventAction> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }
}
