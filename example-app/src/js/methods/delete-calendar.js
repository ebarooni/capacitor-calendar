import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getCalendarId } from '../utils/ids.js';

export function registerDeleteCalendar() {
  document.querySelector('#delete-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.deleteCalendar({ id: getCalendarId() });
    console.log('#deleteCalendar');
  });
}
