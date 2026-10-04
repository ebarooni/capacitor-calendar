import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getCalendarIdInput } from '../utils/dom.js';

export function registerDeleteCalendar() {
  document.querySelector('#delete-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.deleteCalendar({ id: getCalendarIdInput().value });
    console.log('#deleteCalendar');
  });
}
