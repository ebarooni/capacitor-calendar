import { WebPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';

export class CapacitorCalendarWeb
  extends WebPlugin
  implements CapacitorCalendarPlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
