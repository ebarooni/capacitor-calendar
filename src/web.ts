import { WebPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';

export class CapacitorCalendarWeb
    extends WebPlugin
    implements CapacitorCalendarPlugin
{
    public createEventWithPrompt(): Promise<{ action: string }> {
        throw this.unimplemented(`${this.createEventWithPrompt.name} is not implemented on the web`);
    }
}
