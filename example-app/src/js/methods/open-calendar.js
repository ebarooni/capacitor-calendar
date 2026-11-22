import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { isWebPlatform } from '../utils/platform.js';

export function registerOpenCalendar() {
  document.querySelector('#open-calendar').addEventListener('click', async () => {
    // On web, openCalendar needs a provider; native platforms ignore it
    const provider = isWebPlatform() ? 'google' : undefined;
    await CapacitorCalendar.openCalendar({ date: Date.now(), provider });
    console.log('#openCalendar');
  });
}
